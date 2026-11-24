import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WhatsAppChatLink } from "@/components/WhatsAppChatLink";

/** Big yellow call-to-action band that closes the page above the black footer. */
export function CtaBand() {
  return (
    <section className="w-full bg-[#F7E0D4] text-[#1A1A1A] border-t-2 border-[#1A1A1A]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <h2 className="text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.95] font-extrabold tracking-[-0.05em] max-w-3xl">
          Ready to pay less on your EMIs?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#lead-form"
            data-analytics-cta="cta_band_check_eligibility"
            data-analytics-location="cta_band"
            className="inline-flex items-center justify-center gap-2 h-[60px] px-7 bg-[#FF5A00] text-[#1A1A1A] text-lg font-bold rounded border-2 border-[#1A1A1A] shadow-[4px_4px_0_0_#1A1A1A] hover:bg-[#E04F00] transition-colors"
          >
            Check my eligibility <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <WhatsAppChatLink
            data-analytics-location="cta_band"
            className="inline-flex items-center justify-center gap-2.5 h-[60px] px-7 bg-white text-[#1A1A1A] text-lg font-bold rounded border-2 border-[#1A1A1A] shadow-[4px_4px_0_0_#1A1A1A] hover:bg-[#F7E0D4] transition-colors"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Chat on WhatsApp
          </WhatsAppChatLink>
        </div>
      </div>
    </section>
  );
}
