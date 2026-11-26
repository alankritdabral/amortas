import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrackedAccordion } from "@/components/analytics/TrackedAccordion";
import { jsonLd, pageFaqSchema } from "@/lib/structuredData";
import { services, type ServiceKey } from "@/lib/creditSolutions";
import type { Faq } from "@/lib/pageContent";

const wrap = "max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]";
const h2 = "text-[36px] sm:text-[48px] leading-[1.02] tracking-[-0.04em] font-bold";

export function SectionHead({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className={h2}>{title}</h2>
      {intro && <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#626262]">{intro}</p>}
    </div>
  );
}

export type Step = { title: string; text: string };

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <section className="bg-white text-[#252525]">
      <div className={wrap}>
        <SectionHead title="How it works" />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-[#FFE4CC] p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#252525] text-base font-bold text-white">{i + 1}</span>
              <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-[#3A3A3A]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export type Feature = { icon: LucideIcon; title: string; text: string };

export function FeatureGrid({ title, intro, items, tint = false }: { title: string; intro?: string; items: Feature[]; tint?: boolean }) {
  return (
    <section className={`${tint ? "bg-[#FFF9F4]" : "bg-white"} text-[#252525]`}>
      <div className={wrap}>
        <SectionHead title={title} intro={intro} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title: t, text }) => (
            <div key={t} className="rounded-2xl border border-[#E7E2DD] bg-white p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#FD6C01]"><Icon className="h-6 w-6" aria-hidden="true" /></span>
              <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">{t}</h3>
              <p className="mt-2 text-base leading-relaxed text-[#626262]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const situations: { when: string; service: ServiceKey; note: string }[] = [
  { when: "3 or more EMIs and card dues", service: "debt-consolidation", note: "Best with a score of 700+" },
  { when: "Card balance above ₹25,000", service: "credit-card-debt", note: "Cards often cost 36%+ a year" },
  { when: "One loan at 16%+ interest", service: "high-interest", note: "Refinance to cut the rate" },
  { when: "A loan at 13%+ and a strong score", service: "balance-transfer", note: "Count the fees first" },
  { when: "Short app loans, repaid in weeks", service: "app-loan", note: "Swap for one regular EMI" },
  { when: "Planned expense, light EMIs", service: "personal-loan", note: "Score 700+, EMIs under 40% of income" },
  { when: "Cash needed now and then", service: "overdraft", note: "Pay interest only on what you use" },
];

/** A static table: which situation points to which service. Crawlable text, not just an interactive tool. */
export function SituationTable() {
  return (
    <section className="section-tint text-[#252525]">
      <div className={wrap}>
        <SectionHead title="Your report, your best fit." intro="Whichever bureau you check, these are the patterns we look for. Your own result is matched automatically once you run the check." />
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#E7E2DD] bg-white">
          <ul role="list" className="divide-y divide-[#E7E2DD]">
            {situations.map((s) => (
              <li key={s.when} className="grid items-center gap-2 px-5 py-5 md:grid-cols-[5fr_4fr_3fr] md:px-7">
                <div>
                  <p className="text-lg font-semibold leading-snug">{s.when}</p>
                  <p className="mt-1 text-sm text-[#737373]">{s.note}</p>
                </div>
                <p className="text-base font-bold text-[#C94400]">{services[s.service].title}</p>
                <Link href={services[s.service].href} className="inline-flex items-center gap-1.5 text-sm font-bold hover:text-[#C94400] md:justify-end">
                  Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CreditFaq({ faqs, faqSet }: { faqs: Faq[]; faqSet: string }) {
  return (
    <section className="section-tint text-[#252525]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageFaqSchema(faqs)) }} />
      <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16`}>
        <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold lg:sticky lg:top-28 self-start">Common questions.</h2>
        <TrackedAccordion faqSet={faqSet} type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem value={`f-${i}`} key={f.q} className="mb-3 rounded-xl border border-[#252525]/25 bg-white px-4 transition-colors data-[state=open]:bg-[#FFE4CC] md:px-6">
              <AccordionTrigger className="gap-6 py-5 text-left hover:no-underline">
                <span className="text-xl font-semibold leading-snug tracking-[-0.015em] md:text-2xl">{f.q}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-8">
                <p className="max-w-xl text-base leading-relaxed md:text-lg">{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </TrackedAccordion>
      </div>
    </section>
  );
}

export function CheckSection({ children, heading, text }: { children: React.ReactNode; heading: string; text: string }) {
  return (
    <section id="check" className="scroll-mt-20 bg-[#FFE4CC] py-12 md:py-[72px]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center text-[#252525]">
          <h2 className={h2}>{heading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#3A3A3A]">{text}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
