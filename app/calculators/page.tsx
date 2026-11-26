import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = buildMetadata({
  title: "Loan & EMI Calculators {year}",
  description:
    "Free {year} calculators for Indian borrowers: work out a personal loan EMI, estimate EMI savings, or see what debt consolidation could look like.",
  path: "/calculators",
  keywords: ["best loan calculators India", "India's best EMI calculators", "free loan and EMI calculators India"],
});

const calculators = [
  {
    title: "Debt Consolidation Calculator",
    description: "Combine multiple personal loans, credit card dues and app loans into one single lower EMI.",
    href: "/calculators/debt-consolidation-calculator",
  },
  {
    title: "Personal Loan EMI Calculator",
    description: "Work out the monthly EMI, total interest and total payable on a personal loan.",
    href: "/personal-loan-emi-calculator",
  },
  {
    title: "EMI Savings Calculator",
    description: "See how much you could save every month by combining your loans and card dues into one lower-rate loan.",
    href: "/emi-savings-calculator",
  },
];

const HELP = [
  { title: "Free, no sign-up", text: "Move the sliders and see results instantly. We only ask for details if you want us to call you." },
  { title: "No effect on your score", text: "Calculators never touch your credit report, so you can try as many scenarios as you like." },
  { title: "Estimates, not offers", text: "Results are indicative. The lender decides the final rate, fees and tenure." },
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-white text-[#252525]">
      <div className="h-[84px]" aria-hidden="true" />
      <section className="bg-[#FFF3E8] border-b border-[#F0E3D8]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16 grid gap-10 lg:grid-cols-[6fr_5fr] lg:gap-16 items-center">
          <div>
          <p className="text-base font-semibold">Tools</p>
          <h1 className="mt-3 text-[clamp(36px,8vw,56px)] leading-[1.02] tracking-[-0.04em] font-medium max-w-3xl">Loan and EMI calculators.</h1>
          <p className="mt-5 text-lg md:text-xl leading-[1.5] max-w-xl">
            Pick the one that matches what you&apos;re trying to work out. Each takes under a minute.
          </p>
          </div>
          <div className="w-full lg:max-w-[520px] lg:ml-auto">
            <ContactForm variant="card" location="hero" />
          </div>
        </div>
      </section>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Calculators" }]} />
      <section className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {calculators.map((c, n) => (
            <Link
              key={c.href}
              href={c.href}
              data-analytics-cta={`calculators_hub_${c.href.split("/").pop()}`}
              data-analytics-location="calculators_hub"
              className="group flex flex-col rounded-lg border border-[#E7E2DD] p-7 transition-colors hover:border-[#252525]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#FD6C01]"><Calculator className="h-6 w-6" aria-hidden="true" /></span>
                <span className="text-sm font-semibold text-[#626262]">0{n + 1}</span>
              </div>
              <h2 className="mt-8 text-2xl leading-tight font-bold tracking-[-0.02em]">{c.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-[#626262]">{c.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-semibold">
                Open calculator <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-tint">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 grid gap-5 md:grid-cols-3">
          {HELP.map((h) => (
            <div key={h.title} className="rounded-lg bg-white border border-[#E7E2DD] p-6">
              <h3 className="text-lg font-bold">{h.title}</h3>
              <p className="mt-2 leading-relaxed text-[#626262]">{h.text}</p>
            </div>
          ))}
        </div>
      </section>
      <LeadForm />
    </div>
  );
}
