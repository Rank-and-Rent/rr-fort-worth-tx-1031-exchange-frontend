import Link from "next/link";
import site from "@/content/site.json";

export default function BottomCTA() {
  return (
    <section className="bg-primary py-16 lg:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center text-primaryfg md:px-12 lg:px-16">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Don&apos;t Miss Your Deadline</p>
        <h2 className="font-serif text-3xl font-normal md:text-4xl">
          Ready To Lock In Your Replacement Property?
        </h2>
        <p className="max-w-2xl text-sm text-primaryfg/70">
          Every day counts when you&apos;re on the 45-day clock. Our Fort Worth team can match you with IRS-compliant replacement properties within 24 hours. Call now or get in touch to secure your inventory before someone else does.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href={`tel:${site.phoneDigits}`}
            className="border border-primaryfg bg-primaryfg px-8 py-3 text-xs font-medium tracking-[0.15em] text-primary transition hover:bg-transparent hover:text-primaryfg"
          >
            CALL {site.phone} NOW
          </a>
          <Link
            href="/contact#contact-form"
            className="border border-primaryfg/60 px-8 py-3 text-xs font-medium tracking-[0.15em] text-primaryfg transition hover:bg-primaryfg/10"
          >
            GET IN TOUCH
          </Link>
        </div>
        <p className="text-xs text-primaryfg/50">Monday-Friday: 8am-6pm • Same-day property matching • Free consultation</p>
      </div>
    </section>
  );
}
