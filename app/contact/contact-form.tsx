'use client';

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DIGITS,
} from "@/lib/constants";
import { servicesData } from "@/data/services";
import { getShortServiceName } from "@/lib/service-names";

declare global {
  interface Window {
    _turnstileLoaded?: boolean;
    _lastTurnstileToken?: string;
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      execute: (widgetId: string, options?: Record<string, unknown>) => Promise<string>;
      reset: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Utility to load Turnstile script exactly once
function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window._turnstileLoaded) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );
    if (existing) {
      window._turnstileLoaded = true;
      return resolve();
    }
    const s = document.createElement("script");
    s.src = TURNSTILE_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => {
      window._turnstileLoaded = true;
      resolve();
    };
    s.onerror = () => {
      console.error("Failed to load Turnstile script");
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(s);
  });
}

type ContactFormProps = {
  heading?: string;
  description?: string;
  variant?: "default" | "compact";
  formId?: string;
  prefillProjectType?: string;
};

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  timeline: string;
  details: string;
};

const defaultState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  timeline: "",
  details: "",
};

// Base project types
const baseProjectTypes = [
  'Multifamily Property Identification',
  'Industrial Property Search',
  'Triple Net Retail Properties',
  'Medical Office Buildings',
  'Self Storage Facilities',
  'Hospitality Assets',
  'Land Development Sites',
  'Mixed Use Properties',
  'Exchange Timeline Planning',
  'Qualified Intermediary Coordination',
  'Reverse Exchange Setup',
  'Construction Exchange Oversight',
  'CPA and Attorney Alignment',
  'Other'
];

// Get all service names from servicesData
const allServiceNames = servicesData.map(service => getShortServiceName(service.slug));

// Combine base types with service names, removing duplicates
const getAllProjectTypes = (customType?: string): string[] => {
  const types = new Set([...baseProjectTypes, ...allServiceNames]);
  if (customType && customType.trim()) {
    types.add(customType.trim());
  }
  return Array.from(types).sort();
};

function ContactFormInner({
  heading = "Start your Fort Worth 1031 exchange",
  description = "Share your transaction timeline and we will coordinate a call with our exchange desk.",
  variant = "default",
  formId = "contact-form",
  prefillProjectType,
  projectTypeFromParams,
}: ContactFormProps & { projectTypeFromParams?: string }) {
  const [formState, setFormState] = useState<FormState>(defaultState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [turnstileId, setTurnstileId] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const captchaContainerRef = useRef<HTMLDivElement | null>(null);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get projectType from URL params to include in dropdown options
  const projectTypeParam = projectTypeFromParams || prefillProjectType;
  
  // Memoize project types list to include any custom type from URL
  const projectTypes = getAllProjectTypes(projectTypeParam || undefined);

  useEffect(() => {
    // Prefill form from URL parameters
    if (projectTypeParam) {
      setFormState(prev => ({ ...prev, projectType: projectTypeParam }));
    }
  }, [projectTypeParam]);

  // Load Turnstile script
  useEffect(() => {
    let cancelled = false;
    const initTimeout = setTimeout(async () => {
      if (cancelled) return;
      if (!TURNSTILE_SITE_KEY) return;

      try {
        await loadTurnstile();
        if (cancelled) return;

        if (!window.turnstile) {
          console.error("Turnstile API not available");
          return;
        }

        if (!captchaContainerRef.current) {
          console.error("Turnstile ref not mounted");
          return;
        }

        const id: string = window.turnstile.render(captchaContainerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          size: "normal",
          callback: () => {
            setTurnstileReady(true);
          },
          "error-callback": () => {
            console.warn("Turnstile error");
            setTurnstileReady(false);
          },
          "timeout-callback": () => {
            console.warn("Turnstile timeout");
            setTurnstileReady(false);
          },
        });
        setTurnstileId(id);
        setTurnstileReady(true);
        console.log("Turnstile initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Turnstile:", error);
        setTurnstileReady(false);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(initTimeout);
    };
  }, []);

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const validate = () => {
    if (!formState.name.trim()) return "Name is required";
    if (!formState.email.trim()) return "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) return "Valid email required";
    if (!formState.phone.trim()) return "Phone is required";
    if (!formState.projectType) return "Project type is required";
    if (!formState.timeline.trim()) return "Timeline is required";
    if (!formState.details.trim()) return "Please provide details about your project";
    if (TURNSTILE_SITE_KEY && (!turnstileReady || !window.turnstile || !turnstileId)) {
      return "Please complete the security verification.";
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setStatus("submitting");

      // Get Turnstile token
      let turnstileToken = '';
      if (TURNSTILE_SITE_KEY && window.turnstile && turnstileId) {
        try {
          // Reset before executing to avoid "already executed" error
          window.turnstile.reset(turnstileId);
          turnstileToken = await new Promise<string>((resolve, reject) => {
            if (!window.turnstile) {
              reject(new Error("Turnstile not available"));
              return;
            }
            window.turnstile.execute(turnstileId, {
              async: true,
              action: "form_submit",
              callback: (t: string) => resolve(t),
              "error-callback": () => reject(new Error("turnstile-error")),
              "timeout-callback": () => reject(new Error("turnstile-timeout")),
            });
          });
        } catch (err) {
          console.error("Turnstile execution error:", err);
          setStatus("error");
          setError('Security verification failed. Please try again.');
          if (window.turnstile && turnstileId) {
            window.turnstile.reset(turnstileId);
          }
          return;
        }
      }

      // Prepare phone number (digits only)
      const phoneDigits = formState.phone.replace(/\D/g, '');

      // Submit to API
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          company: formState.company,
          email: formState.email,
          phone: phoneDigits,
          projectType: formState.projectType,
          timeline: formState.timeline,
          details: formState.details,
          'cf-turnstile-response': turnstileToken,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormState(defaultState);
        // Reset turnstile
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to submit form' }));
        setStatus("error");
        setError(errorData.error || 'We could not send that message. Please try again or call us.');
        // Reset turnstile on error
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("We could not send that message. Please try again or call us.");
      // Reset turnstile on error
      if (window.turnstile && turnstileId) {
        window.turnstile.reset(turnstileId);
      }
    }
  };

  const siteKeyMissing = !TURNSTILE_SITE_KEY;

  return (
    <>
      <section
        id={formId}
        className={clsx(
          "rounded-3xl border border-outline/60 bg-panel p-6 shadow-[0_20px_48px_rgba(21,34,59,0.1)]",
          variant === "compact" && "p-5"
        )}
      >
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-heading/60">Secure Intake</p>
          <h3 className="font-serif text-2xl font-semibold text-heading">{heading}</h3>
          <p className="text-sm text-ink/80">
            {description} All submissions include a timestamp for {timezone}.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-heading mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => handleChange("name")(e)}
                className="w-full rounded-full border border-outline/60 bg-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink/50 focus:border-accent focus:outline-none"
                required
              />
              {error && error.includes("Name") && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-heading mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                value={formState.company}
                onChange={(e) => handleChange("company")(e)}
                className="w-full rounded-full border border-outline/60 bg-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink/50 focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-heading mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => handleChange("email")(e)}
                className="w-full rounded-full border border-outline/60 bg-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink/50 focus:border-accent focus:outline-none"
                required
              />
              {error && error.includes("Email") && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-heading mb-2">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                value={formState.phone}
                onChange={(e) => handleChange("phone")(e)}
                className="w-full rounded-full border border-outline/60 bg-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink/50 focus:border-accent focus:outline-none"
                required
              />
              {error && error.includes("Phone") && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="projectType" className="block text-sm font-semibold text-heading mb-2">
              Project Type *
            </label>
            <select
              id="projectType"
              value={formState.projectType}
              onChange={(e) => handleChange("projectType")(e)}
              className="w-full rounded-full border border-outline/60 bg-panel px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
              required
            >
              <option value="">Select a project type</option>
              {projectTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {error && error.includes("Project type") && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-semibold text-heading mb-2">
              Timeline *
            </label>
            <input
              type="text"
              id="timeline"
              value={formState.timeline}
              onChange={(e) => handleChange("timeline")(e)}
              placeholder="e.g., 45 days, 3 months, flexible"
              className="w-full rounded-full border border-outline/60 bg-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink/50 focus:border-accent focus:outline-none"
              required
            />
            {error && error.includes("Timeline") && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-semibold text-heading mb-2">
              Project Details *
            </label>
            <textarea
              id="details"
              value={formState.details}
              onChange={(e) => handleChange("details")(e)}
              rows={6}
              placeholder="Tell us about your current property, desired replacement property types, budget, and any specific requirements..."
              className="w-full rounded-2xl border border-outline/60 bg-secondary/30 p-3 text-sm text-ink placeholder:text-ink/50 focus:border-accent focus:outline-none resize-vertical"
              required
            />
            {error && error.includes("details") && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {TURNSTILE_SITE_KEY && (
            <div className="mt-4 flex justify-center">
              <div ref={captchaContainerRef} className="min-h-[78px]" />
            </div>
          )}
          {siteKeyMissing && (
            <p className="text-xs text-red-500 mt-2">Turnstile site key missing. Please set NEXT_PUBLIC_TURNSTILE_SITE_KEY.</p>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "submitting" || (TURNSTILE_SITE_KEY && !turnstileReady) || siteKeyMissing}
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-sm text-primary">Thank you. Our team will confirm receipt shortly.</p>
          )}

          <div className="text-xs text-ink/60">
            <p>
              Prefer to talk now? Call {" "}
              <a className="text-accent underline" href={`tel:${CONTACT_PHONE_DIGITS}`}>
                {CONTACT_PHONE}
              </a>{" "}
              or email {" "}
              <a className="text-accent underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

function ContactFormWithSearchParams(props: ContactFormProps) {
  const params = useSearchParams();
  const projectTypeFromParams = params?.get("projectType") || undefined;

  return <ContactFormInner {...props} projectTypeFromParams={projectTypeFromParams} />;
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <Suspense fallback={<div className="rounded-3xl border border-outline/60 bg-panel p-6">Loading form...</div>}>
      <ContactFormWithSearchParams {...props} />
    </Suspense>
  );
}


