'use client';
import { usePathname } from "next/navigation";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrackedAccordion } from "@/components/analytics/TrackedAccordion";
import Link from "next/link";
import { siteFaqs, homeFaqs } from "@/content/faq";
import { ArrowRight, MessageCircle } from "lucide-react";

/** `featured` shows only the few most important questions (landing page) with a link to all of them. */
export function FAQ({ featured = false }: { featured?: boolean }) {
  const pathname = usePathname();
  const faqs = featured ? homeFaqs : siteFaqs;
  const faqSet = pathname === "/faq" ? "faq" : "home";
  return (
    <div id="faq" className="@container w-full text-[#252525]">
      <div className="grid grid-cols-1 @3xl:grid-cols-[5fr_7fr] gap-8 @3xl:gap-16">
        <div className="@3xl:sticky @3xl:top-28 self-start">
          <h2 className="text-[48px] sm:text-[56px] @3xl:text-[56px] leading-[1.0] tracking-[-0.04em] font-bold">
            You&apos;re probably wondering&hellip;
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#252525] max-w-sm">
            These are the questions people ask us before anything else. We&apos;ve answered them
            straight.
          </p>
          <div className="mt-8 max-w-sm bg-[#252525] text-white p-6 rounded-xl border border-[#252525]/25 shadow-standard">
            <p className="text-xl font-extrabold tracking-[-0.02em]">Still have a question?</p>
            <p className="mt-2 text-base text-[#D4D4D4]">Talk to a credit specialist. It&apos;s free, and there&apos;s no pressure.</p>
            <a
              href="/whatsapp-chat"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-cta="faq_whatsapp"
              data-analytics-location="faq"
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-lg bg-[#25D366] px-5 font-bold text-[#252525] transition-colors hover:bg-[#1DA851]"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div>
        <TrackedAccordion faqSet={faqSet} type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="border border-[#252525]/25 bg-white rounded-xl mb-3 px-4 md:px-6 data-[state=open]:bg-[#FFE4CC] transition-colors"
            >
              <AccordionTrigger className="hover:no-underline text-left gap-6 py-5 group">
                <span className="text-[21px] md:text-[26px] leading-snug font-semibold tracking-[-0.015em] text-[#252525] group-hover:underline transition-colors">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-8">
                <p className="text-base md:text-lg leading-relaxed text-[#252525] max-w-xl">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </TrackedAccordion>
        {featured && (
          <Link
            href="/faq"
            data-analytics-cta="faq_see_all"
            data-analytics-location="faq"
            className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-[#252525] underline underline-offset-4 hover:text-[#E15F00]"
          >
            See all questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
        </div>
      </div>
    </div>
  );
}
