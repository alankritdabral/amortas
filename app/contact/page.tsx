import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { MessageCircle, PhoneForwarded, ListChecks, BadgeCheck, CheckCheck } from "lucide-react";
import logo from "@/public/img/logo.webp";
import { ContactForm } from "@/components/ContactForm";
import { contact } from "@/lib/config";
import { WhatsAppChatLink } from "@/components/WhatsAppChatLink";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Credit Expert India debt specialists for assistance with personal loans and debt consolidation.",
  path: "/contact",
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": contact.addresses.map((addr) => ({
    "@type": "FinancialService",
    "name": `Credit Expert India - ${addr.city} Branch`,
    "description": "Debt consolidation, balance transfer and personal loan advisory services.",
    "telephone": contact.whatsapp,
    "email": contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": addr.fullAddress,
      "addressLocality": addr.city,
      "addressCountry": "IN"
    }
  }))
};

const afterSteps = [
  { Icon: PhoneForwarded, lead: "We call you back.", rest: "Usually within 24 hours, on the number you gave us." },
  { Icon: ListChecks, lead: "We go through your loans with you.", rest: "Your EMIs and your options, in plain words." },
  { Icon: BadgeCheck, lead: "You decide.", rest: "It is free to ask, and there is no pressure to go ahead." },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Chapter 1: the person and the form, together on the first screen */}
      <section id="contact-form" className="bg-[#EAF3FF]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24 grid gap-12 lg:gap-16 lg:grid-cols-[6fr_5fr] items-start">
          <div className="order-2 lg:order-1 lg:sticky lg:top-28">
            <h1 className="rise text-[clamp(48px,9vw,92px)] leading-[0.96] tracking-[-0.045em] font-semibold text-[#0A2540] text-balance">
              Talk to a real person.
            </h1>
            <p className="rise mt-6 max-w-lg text-lg md:text-xl leading-relaxed text-[#0A2540]" style={{ animationDelay: "80ms" }}>
              Questions about your loans or consolidation options? Message us on WhatsApp or leave your details and a
              credit specialist will get back to you.
            </p>
            <div className="rise mt-9 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "160ms" }}>
              <WhatsAppChatLink
                data-analytics-location="contact_hero"
                className="inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-md bg-[#0052CC] text-white text-base font-semibold transition-colors hover:bg-[#0A2540]"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Chat with us on WhatsApp
              </WhatsAppChatLink>
            </div>
            <ul className="rise mt-10 space-y-2 text-lg text-[#0A2540]" style={{ animationDelay: "240ms" }}>
              <li>Free to ask.</li>
              <li>Usually a reply within 24 hours.</li>
              <li>Offices in Dehradun, Delhi and Rudrapur.</li>
            </ul>
          </div>

          <div className="order-1 lg:order-2 rise w-full lg:max-w-[560px] lg:ml-auto" style={{ animationDelay: "120ms" }}>
            <ContactForm variant="page" />
          </div>
        </div>
      </section>

      {/* Picture */}
      <div className="relative h-[280px] sm:h-[360px] lg:h-[460px] bg-[#0A2540]">
        <Image
          src="/img/teenager.webp"
          alt="A smiling customer reading a message on their phone"
          fill
          sizes="100vw"
          className="object-cover object-[50%_30%]"
        />
      </div>

      {/* Chapter 2: what happens next */}
      <section className="bg-[#F3F7FB]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32 grid gap-14 lg:gap-20 lg:grid-cols-[5fr_6fr] items-start">
          <div>
            <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-semibold text-[#0A2540] text-balance">
              What happens after you send it.
            </h2>

            <div className="mt-10 max-w-md overflow-hidden rounded-lg bg-[#EFEAE2]" aria-hidden="true">
              <div className="flex items-center gap-3 bg-[#0A2540] px-4 py-3 text-white">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                  <Image src={logo} alt="" className="h-[18px] w-auto object-contain" />
                </div>
                <div className="leading-tight">
                  <p className="text-base font-semibold">Credit Expert India</p>
                  <p className="text-sm text-[#BFDBFE]">usually replies within 24 hours</p>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 px-4 py-6">
                <div className="self-end max-w-[85%] rounded-lg rounded-tr-none bg-[#D9FDD3] px-3.5 pt-2.5 pb-2 text-[#111B21]">
                  <p className="text-base leading-snug">I have a few EMIs. Can I pay less every month?</p>
                  <p className="mt-1 flex items-center justify-end gap-1 text-sm text-[#54656F]">
                    10:42
                    <CheckCheck className="h-4 w-4 text-[#0052CC]" strokeWidth={2.5} />
                  </p>
                </div>
                <div className="self-start max-w-[85%] rounded-lg rounded-tl-none bg-white px-3.5 pt-2.5 pb-2 text-[#111B21]">
                  <p className="text-base leading-snug">
                    Maybe. Share a few details and we&apos;ll go through them with you. It&apos;s free, and
                    there&apos;s no pressure to go ahead.
                  </p>
                  <p className="mt-1 text-right text-sm text-[#54656F]">10:43</p>
                </div>
              </div>
            </div>
          </div>

          <ol className="text-[#0A2540]">
            {afterSteps.map(({ Icon, lead, rest }, i) => (
              <li key={lead} className="relative flex gap-5 sm:gap-7 pb-12 last:pb-0">
                {i < afterSteps.length - 1 && (
                  <span aria-hidden="true" className="absolute left-[27px] top-14 bottom-0 w-1 -translate-x-1/2 rounded-full bg-[#BFDBFE]" />
                )}
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0052CC] text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="pt-1.5">
                  <p className="text-[26px] sm:text-[34px] leading-[1.1] tracking-[-0.03em] font-semibold">{lead}</p>
                  <p className="mt-2 text-lg sm:text-xl leading-relaxed text-[#3C4F69]">{rest}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Chapter 3: offices and direct lines */}
      <section className="bg-[#0A2540] text-white">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32">
          <h2 className="text-[40px] sm:text-[72px] leading-[1] tracking-[-0.04em] font-semibold text-balance">
            Or come and see us.
          </h2>
          <div className="mt-14 md:mt-20 grid gap-12 md:grid-cols-3">
            {contact.addresses.map((addr) => (
              <div key={addr.city}>
                <h3 className="text-[32px] sm:text-[40px] leading-none tracking-[-0.03em] font-semibold">{addr.city}</h3>
                <p className="mt-4 text-lg leading-relaxed text-[#BFDBFE]">{addr.fullAddress}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-24 grid gap-10 sm:grid-cols-2 bg-[#0052CC] rounded-lg p-8 md:p-12">
            <div>
              <h3 className="text-[28px] sm:text-[32px] leading-none tracking-[-0.03em] font-semibold">WhatsApp</h3>
              <WhatsAppChatLink className="mt-4 block text-xl sm:text-2xl font-medium underline underline-offset-4 decoration-2">
                Chat with a credit expert
              </WhatsAppChatLink>
            </div>
            <div className="min-w-0">
              <h3 className="text-[28px] sm:text-[32px] leading-none tracking-[-0.03em] font-semibold">Email</h3>
              <a href={`mailto:${contact.email}`} className="mt-4 block text-xl sm:text-2xl font-medium underline underline-offset-4 decoration-2 break-all">
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
