import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has moved.",
  robots: { index: false, follow: true },
};

const suggestions = [
  { href: "/personal-loan", label: "Personal loans" },
  { href: "/debt-consolidation", label: "Debt consolidation" },
  { href: "/personal-loan-emi-calculator", label: "EMI calculator" },
  { href: "/learning-center", label: "Learning center" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact us" },
];

const GUIDES = [
  { href: "/learning-center/what-is-emi-and-how-is-it-calculated", title: "What is an EMI?" },
  { href: "/learning-center/cibil-score-ranges-and-how-to-improve", title: "CIBIL score ranges" },
  { href: "/learning-center/how-to-spot-loan-scams-in-india", title: "How to spot loan scams" },
];

export default function NotFound() {
  return (
    <div className="bg-white text-[#252525]">
      <div className="h-[84px]" aria-hidden="true" />
      <section className="bg-[#FFF3E8] border-b border-[#F0E3D8]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 grid gap-8 lg:grid-cols-[7fr_5fr] items-center">
          <div>
            <p className="text-base font-semibold">Error 404</p>
            <h1 className="mt-4 text-[clamp(40px,9vw,72px)] leading-[1.0] tracking-[-0.04em] font-medium max-w-3xl">
              We couldn&apos;t find that page.
            </h1>
            <p className="mt-5 text-lg md:text-xl leading-[1.5] max-w-xl">
              The link may be broken or the page may have moved. Start from one of these instead.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/"
                data-analytics-cta="not_found_home"
                data-analytics-location="not_found"
                className="inline-flex items-center gap-2 rounded bg-[#252525] text-white font-semibold text-base px-[22px] h-[48px] hover:bg-white hover:text-[#252525] transition-colors"
              >
                Back to home <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/eligibility"
                data-analytics-cta="not_found_eligibility"
                data-analytics-location="not_found"
                className="inline-flex items-center rounded bg-white font-semibold text-base px-[22px] h-[48px] hover:bg-[#252525] hover:text-white transition-colors"
              >
                Check eligibility
              </Link>
            </div>
          </div>
          <p aria-hidden="true" className="hidden select-none text-right text-[220px] leading-none tracking-[-0.06em] font-bold text-white/30 lg:block">404</p>
        </div>
      </section>
      <section className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
        <h2 className="text-[28px] md:text-[32px] leading-tight tracking-[-0.02em] font-bold">Popular pages</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="group flex items-center justify-between rounded-lg border border-[#E7E2DD] p-5 font-semibold transition-colors hover:border-[#252525]">
                {s.label}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mt-14 text-[28px] md:text-[32px] leading-tight tracking-[-0.02em] font-bold">Or read a guide</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {GUIDES.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="block rounded-lg bg-[#FFE4CC] p-5 font-semibold transition-colors hover:bg-[#FFD1A3]">{g.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
