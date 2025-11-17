'use client';

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import clsx from "clsx";
import { servicesData } from "@/data/services";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DIGITS,
  FORM_INPUT_IDS,
} from "@/lib/constants";

declare global {
  interface Window {
    turnstile?: TurnstileWindow;
  }
}

type TurnstileWindow = {
  render: (element: HTMLElement, options: TurnstileOptions) => number;
  reset: (widgetId: number) => void;
};

type TurnstileOptions = {
  sitekey: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark";
  tabindex?: number;
};

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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

const timelineOptions = ["Immediate", "45 days", "180 days", "Planning phase"];

export default function ContactForm({
  heading = "Tell us about your exchange",
  description = "Secure intake keeps your documents and project type protected. We route submissions directly to our exchange desk.",
  variant = "default",
  formId = "contact-form",
  prefillProjectType,
}: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>(defaultState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [typeaheadOpen, setTypeaheadOpen] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const datalistId = useId();
  const params = useSearchParams();
  const captchaContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const suggestedProjectTypes = useMemo(
    () => servicesData.map((service) => service.name).sort(),
    []
  );

  const projectTypeParam = params?.get("projectType") || prefillProjectType;

  useEffect(() => {
    if (projectTypeParam) {
      setFormState((prev) => ({ ...prev, projectType: projectTypeParam }));
    }
  }, [projectTypeParam]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.turnstile) {
      setCaptchaReady(true);
    }
  }, []);

  useEffect(() => {
    if (!captchaReady || !TURNSTILE_SITE_KEY || !captchaContainerRef.current) return;
    if (!window.turnstile) return;
    if (widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current);
    }
    widgetIdRef.current = window.turnstile.render(captchaContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => {
        setCaptchaToken(token);
        setCaptchaError(null);
      },
      "error-callback": () => {
        setCaptchaError("Captcha failed. Please refresh and try again.");
      },
      "expired-callback": () => {
        setCaptchaToken("");
      },
      theme: "dark",
      tabindex: 0,
    });
  }, [captchaReady]);

  const resetCaptcha = () => {
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setCaptchaToken("");
  };

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const validate = () => {
    if (!formState.name.trim()) return "Please add your name.";
    if (!formState.email.trim()) return "Please add a valid email.";
    if (!formState.phone.trim()) return "Please add a phone number.";
    if (!formState.projectType.trim()) return "Please add your project type.";
    if (!captchaToken) return "Please complete the CAPTCHA challenge.";
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setCaptchaError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setStatus("submitting");
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setFormState(defaultState);
      resetCaptcha();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("We could not send that message. Please try again or call us.");
      resetCaptcha();
    }
  };

  const siteKeyMissing = !TURNSTILE_SITE_KEY;

  return (
    <>
      <Script
        src={TURNSTILE_SRC}
        id={TURNSTILE_SCRIPT_ID}
        strategy="lazyOnload"
        onLoad={() => setCaptchaReady(true)}
      />
      <section
        id={formId}
        className={clsx(
          "rounded-2xl border border-outline bg-secondary/40 p-6 shadow-glow",
          variant === "compact" && "p-5"
        )}
      >
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/70">Secure Intake</p>
          <h3 className="text-2xl font-semibold text-heading">{heading}</h3>
          <p className="text-sm text-ink/80">
            {description} All submissions show a timestamp for {timezone}.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              id={FORM_INPUT_IDS.name}
              label="Name"
              placeholder="Full name"
              required
              value={formState.name}
              onChange={handleChange("name")}
            />
            <InputField
              id={FORM_INPUT_IDS.company}
              label="Company"
              placeholder="Company or entity"
              value={formState.company}
              onChange={handleChange("company")}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              id={FORM_INPUT_IDS.email}
              label="Email"
              placeholder="you@example.com"
              type="email"
              required
              value={formState.email}
              onChange={handleChange("email")}
            />
            <InputField
              id={FORM_INPUT_IDS.phone}
              label="Phone"
              placeholder="817-555-0123"
              type="tel"
              required
              value={formState.phone}
              onChange={handleChange("phone")}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <InputField
                id={FORM_INPUT_IDS.projectType}
                label="Project Type"
                placeholder="Service name or asset goal"
                required
                value={formState.projectType}
                onChange={(event) => {
                  handleChange("projectType")(event);
                  setTypeaheadOpen(true);
                }}
                list={datalistId}
              />
              <datalist id={datalistId}>
                {suggestedProjectTypes.map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
              {typeaheadOpen && (
                <button
                  type="button"
                  className="absolute right-2 top-9 text-xs text-primary"
                  onClick={() => setTypeaheadOpen(false)}
                >
                  Hide suggestions
                </button>
              )}
            </div>

            <SelectField
              id={FORM_INPUT_IDS.timeline}
              label="Timeline"
              value={formState.timeline}
              onChange={(event) => setFormState((prev) => ({ ...prev, timeline: event.target.value }))}
              options={timelineOptions}
            />
          </div>

          <div>
            <label htmlFor={FORM_INPUT_IDS.details} className="mb-2 block text-sm font-semibold text-heading">
              Details
            </label>
            <textarea
              id={FORM_INPUT_IDS.details}
              name="details"
              placeholder="Tell us about the relinquished asset, equity, debt, and what you need to replace."
              className="min-h-[140px] w-full rounded-xl border border-outline bg-panel/70 p-3 text-sm text-ink focus:border-primary focus:outline-none"
              value={formState.details}
              onChange={handleChange("details")}
            />
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div ref={captchaContainerRef} />
            {!captchaReady && !siteKeyMissing && (
              <p className="text-ink/60">Loading security challenge...</p>
            )}
            {siteKeyMissing && (
              <p className="text-xs text-red-400">
                Turnstile site key missing. Please set NEXT_PUBLIC_TURNSTILE_SITE_KEY.
              </p>
            )}
            {captchaError && <p className="text-xs text-red-400">{captchaError}</p>}
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-primaryfg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={
              status === "submitting" || !captchaToken || siteKeyMissing || !captchaReady
            }
          >
            {status === "submitting" ? "Sending..." : "Submit Request"}
          </button>

          {status === "success" && (
            <p className="text-sm text-primary">
              Thank you. Our team will reach out shortly with a secure intake confirmation.
            </p>
          )}

          <div className="text-xs text-ink/60">
            <p>
              Prefer to talk now? Call{" "}
              <a className="text-primary underline" href={`tel:${CONTACT_PHONE_DIGITS}`}>
                {CONTACT_PHONE}
              </a>{" "}
              or email{" "}
              <a className="text-primary underline" href={`mailto:${CONTACT_EMAIL}`}>
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

type InputFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  list?: string;
};

function InputField({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required,
  list,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-heading">
        {label} {required && <span className="text-ink/60">(required)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        list={list}
        className="rounded-xl border border-outline bg-panel/70 px-3 py-2 text-sm text-heading placeholder:text-ink/50 focus:border-primary focus:outline-none"
      />
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};

function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-heading">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="appearance-none rounded-xl border border-outline bg-panel/70 px-3 py-2 text-sm text-heading focus:border-primary focus:outline-none"
      >
        <option value="">Select timeline</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

