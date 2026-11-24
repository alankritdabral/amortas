"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, X } from "lucide-react";
import { WhatsAppChatLink } from "@/components/WhatsAppChatLink";
import { track } from "@/lib/analytics/track";


type Loan = { id: string; name: string; amount: number; icon: string };

// Example from the design: four EMIs that total ₹28,800 a month, shown as one
// EMI of ₹25,600 (8/9 of the total, about 11% lower).
const LOANS: Loan[] = [
  { id: "personal", name: "Personal Loan", amount: 12500, icon: "/hero/icons/row-personal.png" },
  { id: "card", name: "Credit Card", amount: 8300, icon: "/hero/icons/row-card.png" },
  { id: "od", name: "Overdraft (OD)", amount: 4200, icon: "/hero/icons/row-od.png" },
  { id: "app", name: "App Loan", amount: 3800, icon: "/hero/icons/row-app.png" },
];
const NEW_EMI_RATIO = 25600 / 28800;

const FEATURES = [
  { icon: "/hero/icons/feat-pct.png", text: ["Lower", "interest rate"] },
  { icon: "/hero/icons/feat-layers.png", text: ["One simple", "EMI"] },
  { icon: "/hero/icons/feat-bolt.png", text: ["Quick &", "digital process"] },
];

// 13 lenders in lib/lenderEngine.ts's LENDERS table: all 13 shown in the slider. Images and widths follow the design.
const LOGOS = [
  { src: "/hero/logos/axis.png", alt: "Axis Bank", w: 172, iw: 124, ih: 40 },
  { src: "/hero/logos/hdfc.png", alt: "HDFC Bank", w: 192, iw: 150, ih: 40 },
  { src: "/hero/logos/tata.png", alt: "Tata Capital", w: 173, iw: 128, ih: 40 },
  { src: "/hero/logos/lt.png", alt: "L&T Finance", w: 180, iw: 140, ih: 40 },
  { src: "/hero/logos/smfg.png", alt: "SMFG India Credit", w: 152, iw: 108, ih: 40 },
  { src: "/hero/logos/kotak.png", alt: "Kotak Mahindra Bank", w: 163, iw: 156, ih: 44 },
  { src: "/logos/ICICI.png", alt: "ICICI Bank", w: 170, iw: 150, ih: 30 },
  { src: "/logos/AXISFINANCE.svg", alt: "Axis Finance", w: 172, iw: 130, ih: 33 },
  { src: "/hero/logos/abfl.svg", alt: "Aditya Birla Finance", w: 172, iw: 130, ih: 30 },
  { src: "/hero/logos/chola.svg", alt: "Chola", w: 150, iw: 80, ih: 30 },
  { src: "/hero/logos/indusind.svg", alt: "IndusInd Bank", w: 180, iw: 140, ih: 15 },
  { src: "/hero/logos/piramal.png", alt: "Piramal Finance", w: 150, iw: 80, ih: 37 },
  { src: "/hero/logos/poonawalla.svg", alt: "Poonawalla Fincorp", w: 172, iw: 130, ih: 31 },
];

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

const ORANGE_BTN =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-gradient-to-b from-[#FF6A14] to-[#EC4F00] font-semibold text-white shadow-[0_14px_26px_-12px_rgba(236,79,0,0.85)] transition-[filter,transform] hover:brightness-105 active:translate-y-px";

const LOGO_CARD =
  "flex h-[56px] items-center justify-center rounded-xl border border-[#F5EDE7] bg-white px-3 shadow-[0_10px_24px_-14px_rgba(120,60,20,0.4)]";

const ICON = { unoptimized: true } as const;

export function ConsolidationHero() {
  const [removed, setRemoved] = useState<string[]>([]);
  const active = LOANS.filter((l) => !removed.includes(l.id));
  const total = active.reduce((s, l) => s + l.amount, 0);
  const newEmi = Math.round((total * NEW_EMI_RATIO) / 100) * 100;
  const save = total - newEmi;

  const remove = (id: string) => {
    setRemoved((r) => [...r, id]);
    track({ name: "select_content", params: { content_type: "hero_emi_remove", content_id: id } });
  };

  return (
    <section className="relative z-[25] w-full overflow-hidden bg-gradient-to-b from-[#FFF4EC] via-[#FFF9F5] to-[#FFFDFB] pt-[88px] xl:pt-[98px]">
      <div className="relative mx-auto max-w-[1358px] px-4 pb-10 sm:px-6 lg:px-8 xl:px-0 xl:pb-0">
        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_448px] xl:gap-6">
          {/* ── Left: the promise ── */}
          <div className="order-1 min-w-0 pt-3 xl:pl-2 xl:pt-[13px]">
            <p className="inline-flex h-9 items-center gap-2.5 rounded-full bg-[#FDE5D5] px-[18px] text-[14px] font-[500] text-[#B03F0C] sm:text-[15.5px]">
              <Image src="/hero/icons/shield.png" alt="" width={22} height={22} className="h-[22px] w-[22px]" {...ICON} />
              Debt Consolidation for Salaried Professionals
            </p>

            <h1 className="mt-[22px] xl:mt-[38px] font-[family-name:var(--font-display)] text-[37px] font-[800] leading-[1.05] tracking-[0em] text-[#141414] sm:text-[56px] xl:text-[68px] xl:leading-[0.95] min-[1440px]:text-[80px] min-[1520px]:text-[95px] min-[1520px]:leading-[83px]">
              <span className="block min-[1520px]:h-[83px]">Multiple Loans.</span>
              <span className="block min-[1520px]:h-[83px]"><span className="relative inline-block bg-gradient-to-b from-[#FF6E12] to-[#F04E00] bg-clip-text pb-3 text-transparent">
                One EMI.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 240 26"
                  className="absolute -bottom-2 left-[36%] h-[18px] w-[74%] sm:-bottom-3 sm:h-[24px]"
                  preserveAspectRatio="none"
                >
                  <path d="M4 20 C 70 2, 165 2, 236 18" stroke="#F0560A" strokeWidth="7" strokeLinecap="round" fill="none" />
                </svg>
              </span></span>
            </h1>

            <p className="mt-[16px] max-w-[520px] xl:mt-[28px] text-[18px] leading-[28px] text-[#3D3D3D] sm:text-[20px]">
              Merge your personal loan, credit card, overdraft and app loans into a single EMI, at a lower interest rate.
            </p>

            <ul className="mt-[30px] grid max-w-[530px] grid-cols-3 gap-x-1">
              {FEATURES.map(({ icon, text }, i) => (
                <li
                  key={icon}
                  className={`flex items-center gap-2.5 sm:gap-3 ${i > 0 ? "border-l border-[#F1D9C8] pl-3 sm:pl-4" : "pr-2"}`}
                >
                  <Image src={icon} alt="" width={48} height={48} className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" {...ICON} />
                  <span className="text-[13px] font-[500] leading-tight text-[#1F1F1F] sm:whitespace-nowrap sm:text-[15px]">
                    {text[0]}
                    <br />
                    {text[1]}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-[26px] flex flex-col gap-3 sm:flex-row sm:gap-[22px] xl:mt-[33px] xl:-ml-[11px]">
              <Link
                href="#check-eligibility"
                data-analytics-cta="hero_check_eligibility"
                data-analytics-location="hero"
                className={`${ORANGE_BTN} h-[58px] px-7 text-[20px]`}
              >
                Check my eligibility
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <WhatsAppChatLink
                data-analytics-location="hero"
                className="inline-flex h-[58px] items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border border-[#F0E3D9] bg-white px-[18px] text-[17px] font-[500] text-[#141414] shadow-[0_10px_22px_-14px_rgba(120,60,20,0.45)] transition-colors hover:bg-[#FFF8F3]"
              >
                <Image src="/hero/icons/wa.png" alt="" width={30} height={30} className="h-[30px] w-[30px]" {...ICON} />
                Chat on WhatsApp
              </WhatsAppChatLink>
            </div>

            <ul className="mt-[20px] flex flex-wrap gap-x-[26px] gap-y-2 text-[15px] text-[#1F1F1F]">
              {["No obligation", "No hidden charges", "Stop at any step"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <Check className="h-[18px] w-[18px] text-[#16A34A]" strokeWidth={3} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: the EMI card, with the phone artwork behind it ── */}
          <div className="relative order-3 min-w-0 xl:order-2">
            {/* Artwork cut from the design: orange band, phone, pedestal. Sits behind the card. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[-349px] top-[-96px] hidden origin-[349px_96px] xl:block max-[1519px]:scale-[0.92] max-[1439px]:scale-[0.8]"
              style={{
                width: 452,
                height: 698,
                WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 84px), linear-gradient(to top, transparent 0, #000 46px)",
                maskImage: "linear-gradient(to right, transparent 0, #000 84px), linear-gradient(to top, transparent 0, #000 46px)",
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
              }}
            >
              <Image src="/hero/hero-art.webp" alt="" width={452} height={698} priority {...ICON} />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-full top-[-96px] hidden xl:block"
              style={{ width: 87, height: 698 }}
            >
              <Image src="/hero/hero-arc.webp" alt="" width={87} height={698} {...ICON} />
            </div>

            <div className="relative rounded-[22px] border border-[#F6EBE3] bg-white p-5 shadow-[0_30px_64px_-26px_rgba(150,70,20,0.38)] xl:px-[23px] xl:pb-[26px] xl:pt-[22px]">
              <div className="flex items-center gap-3.5">
                <Image src="/hero/icons/calc.png" alt="" width={34} height={34} className="h-[34px] w-[34px] shrink-0" {...ICON} />
                <h2 className="text-[22px] font-[600] tracking-[-0.015em] text-[#141414] sm:text-[23px]">See your new EMI</h2>
              </div>
              <p className="mt-[5px] text-[15px] text-[#3F3F3F]">Add your current EMIs to see how much you can save.</p>

              <ul className="mt-[14px] flex flex-col gap-[7px]">
                {active.map(({ id, name, amount, icon }) => (
                  <li key={id} className="flex h-[43px] items-center rounded-lg border border-[#EEE7E2] bg-[#FAF8F7] pl-[10px] pr-[7px]">
                    <Image src={icon} alt="" width={36} height={36} className="h-9 w-9 shrink-0" {...ICON} />
                    <span className="ml-[14px] flex-1 text-[15px] font-[500] text-[#141414]">{name}</span>
                    <span className="text-[16px] font-[500] tabular-nums text-[#141414]">{inr(amount)}</span>
                    <button
                      type="button"
                      onClick={() => remove(id)}
                      aria-label={`Remove ${name}`}
                      className="ml-3 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-[#1F1F1F] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#FFF1E8]"
                    >
                      <X className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </button>
                  </li>
                ))}
                {active.length === 0 && (
                  <li className="rounded-lg border border-dashed border-[#FFC9A8] px-4 py-4 text-center text-[15px] text-[#575757]">
                    No loans left in the example.
                  </li>
                )}
              </ul>
              {removed.length > 0 && (
                <button
                  type="button"
                  onClick={() => setRemoved([])}
                  className="mt-2 text-[14px] font-semibold text-[#2E2E2E] underline underline-offset-4"
                >
                  Reset example
                </button>
              )}

              <div className="mt-[16px] flex items-center justify-between border-t-2 border-dashed border-[#F9C7A3] px-[10px] pt-[11px]">
                <span className="text-[16px] font-[500] text-[#141414]">Total (Current EMIs)</span>
                <span className="text-[19px] font-[600] tabular-nums text-[#141414]" aria-live="polite">{inr(total)}</span>
              </div>

              <div className="mt-[14px] rounded-2xl bg-[#FEF0E6] px-[16px] pb-[12px] pt-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <p className="text-[16px] font-[600] text-[#141414]">New EMI with Amortas</p>
                <div className="mt-[3px] flex flex-wrap items-center justify-between gap-x-2 gap-y-2 xl:flex-nowrap">
                  <span className="text-[40px] font-[800] leading-[1.1] tracking-[-0.02em] text-[#F05000] tabular-nums" aria-live="polite">
                    {inr(newEmi)}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md bg-[#E2F5E9] px-2.5 py-[6px] text-[13.5px] font-[500] text-[#15803D]">
                    <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                    Save {inr(save)} / month
                  </span>
                </div>
              </div>

              <Link
                href="#calculator"
                data-analytics-cta="hero_calculate_savings"
                data-analytics-location="hero"
                className={`${ORANGE_BTN} mt-[16px] h-[50px] w-full text-[20px]`}
              >
                Calculate my savings
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

        {/* ── Lender strip ── */}
        <div className="order-2 min-w-0 xl:order-3 xl:col-span-2 xl:pb-10 xl:pt-[44px]">
          <div className="hidden items-center justify-center gap-4 sm:flex xl:gap-[26px]">
            <span aria-hidden="true" className="hidden h-[2px] w-[190px] bg-gradient-to-r from-transparent to-[#F2A06E] xl:block" />
            <p className="text-center text-[17px] font-[500] text-[#141414] sm:text-[20px]">
              13 partner banks and NBFCs compared in one place
            </p>
            <span aria-hidden="true" className="hidden h-[2px] w-[190px] bg-gradient-to-l from-transparent to-[#F2A06E] xl:block" />
          </div>
          <div
            className="lender-strip mt-[22px] py-3 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
            aria-label="Partner lenders"
          >
            <ul className="lender-track animate-marquee flex w-max items-center hover:[animation-play-state:paused]">
              {[0, 1].flatMap((copy) => [
                ...LOGOS.map((l) => (
                  <li
                    key={`${copy}-${l.alt}`}
                    aria-hidden={copy === 1}
                    className="shrink-0 pr-3 xl:pr-[22px]"
                  >
                    <div className={`${LOGO_CARD} w-[140px] xl:w-[var(--w)]`} style={{ ["--w" as string]: `${l.w}px` }}>
                      <Image src={l.src} alt={copy === 1 ? "" : l.alt} width={l.iw} height={l.ih} className="h-auto max-w-full" {...ICON} />
                    </div>
                  </li>
                )),
              ])}
            </ul>
          </div>
        </div>
        </div>

      </div>
    </section>
  );
}
