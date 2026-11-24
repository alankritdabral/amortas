"use client";

import React from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChevronRight,
  CreditCard,
  Gauge,
  Landmark,
  Layers,
  Leaf,
  Percent,
  Scale,
  Share2,
  Smartphone,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { track } from "@/lib/analytics/track";

type Point = { Icon: LucideIcon; title: string; desc: string };
type Solution = {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Headline split around the yellow-highlighted phrase. */
  headline: { before: string; glue?: string; mark: string; after?: string };
  points: [Point, Point, Point];
  /** Show each point's description on the same line as its bold title. */
  inline?: boolean;
  cta: { label: string; href: string };
  /** Artwork cropped from the design (w/h in px); panelAspect is card width / panel height in the design. */
  art: { src: string; w: number; h: number };
  panelAspect: number;
};

const SOLUTIONS: Solution[] = [
  {
    id: "personal-loan",
    label: "Personal Loan",
    icon: User,
    headline: { before: "Make your monthly\nrepayments more\n", mark: "manageable." },
    inline: true,
    points: [
      { Icon: Scale, title: "Combine existing loans", desc: "into one plan" },
      { Icon: CalendarDays, title: "Choose a tenure", desc: "that fits your monthly budget" },
      { Icon: Zap, title: "No obligation", desc: "to proceed after you see your options" },
    ],
    cta: { label: "Check your EMI options", href: "#calculator" },
    art: { src: "/hero/loans/art-1.webp", w: 780, h: 600 },
    panelAspect: 795 / 300,
  },
  {
    id: "credit-card",
    label: "Credit Card",
    icon: CreditCard,
    headline: { before: "Reduce the burden of\nexpensive ", mark: "credit-card debt." },
    points: [
      { Icon: Percent, title: "Get a lower interest rate", desc: "Reduce high credit card interest into a single, lower rate." },
      { Icon: CalendarDays, title: "Flexible repayment tenure", desc: "Choose a duration that fits your monthly budget." },
      { Icon: Zap, title: "One simple EMI", desc: "Convert multiple card dues into one easy EMI." },
    ],
    cta: { label: "Explore card debt options", href: "/credit-card-debt" },
    art: { src: "/hero/loans/art-2.webp", w: 696, h: 552 },
    panelAspect: 795 / 276,
  },
  {
    id: "app-loans",
    label: "App Loans",
    icon: Smartphone,
    headline: { before: "Bring scattered ", mark: "app loans", after: "\ninto a clearer plan." },
    points: [
      { Icon: BarChart3, title: "Lower rates", desc: "Get better interest rates than multiple app loans." },
      { Icon: Layers, title: "Combine & simplify", desc: "Merge all your app loans into a single EMI." },
      { Icon: Zap, title: "One due date", desc: "No more multiple reminders and penalties." },
    ],
    cta: { label: "See app loan options", href: "/app-loan" },
    art: { src: "/hero/loans/art-3.webp", w: 732, h: 444 },
    panelAspect: 795 / 222,
  },
  {
    id: "multiple-loans",
    label: "Multiple Loans",
    icon: Layers,
    headline: { before: "Replace multiple payments\n", glue: "with ", mark: "one simpler repayment." },
    points: [
      { Icon: Share2, title: "Mix loan types", desc: "Bring personal, credit card, and app loans together." },
      { Icon: CalendarDays, title: "One EMI, one due date", desc: "Keep it simple with a single monthly payment." },
      { Icon: Layers, title: "Lower overall cost", desc: "Get a reduced interest rate and save more." },
    ],
    cta: { label: "Explore debt consolidation", href: "/debt-consolidation" },
    art: { src: "/hero/loans/art-4.webp", w: 732, h: 428 },
    panelAspect: 795 / 214,
  },
  {
    id: "overdraft",
    label: "Overdraft",
    icon: Landmark,
    headline: { before: "Explore options for\n", glue: "expensive ", mark: "overdraft debt." },
    points: [
      { Icon: Gauge, title: "Interest add-up fast", desc: "Overdrafts often come with higher, ongoing rates." },
      { Icon: ArrowLeftRight, title: "A fixed-tenure loan", desc: "Bring down your rate and repay in a set timeline." },
      { Icon: Leaf, title: "Save more", desc: "Lower your interest cost and improve cash flow." },
    ],
    cta: { label: "Check overdraft options", href: "/personal-loan-overdraft" },
    art: { src: "/hero/loans/art-5.webp", w: 732, h: 456 },
    panelAspect: 795 / 228,
  },
];

// Tinted tiles behind the three point icons: orange, blue, green.
const TILES = [
  { tile: "#FDEBDD", ink: "#EA580C" },
  { tile: "#E7EEFC", ink: "#2F63D8" },
  { tile: "#E4F4EA", ink: "#16A34A" },
];

// The only yellow on the page: a highlighter behind key words.
const YELLOW = "#F7E0D4";

const Sparkle = ({ className }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 44 40" className={className} fill="none" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round">
    <path d="M8 18 L4 4" />
    <path d="M22 14 L34 4" />
    <path d="M28 26 L40 24" />
  </svg>
);

// As on stripe.com/in: every card stays open and sticks STACK_STEP below the previous one;
// later cards slide over earlier ones, leaving only each earlier card's header strip showing.
const STACK_TOP = 16;
const STACK_STEP = 64;
const CARD_GAP = 16;

export const LoanSolutionsSection = () => {
  // Clicking a strip brings that card forward: scroll until its natural top sits on its pinned slot.
  const bringForward = (idx: number) => {
    const solution = SOLUTIONS[idx];
    if (solution) {
      track({ name: "select_content", params: { content_type: "loan_solution", content_id: solution.id } });
    }
    const rows = document.querySelectorAll<HTMLElement>("[data-row]");
    const row = rows[idx];
    if (!row) return;
    // Pinned rows report their pinned position, so derive the natural one from the container and the rows above.
    let naturalTop = (row.parentElement as HTMLElement).getBoundingClientRect().top;
    for (let i = 0; i < idx; i++) naturalTop += rows[i].offsetHeight + CARD_GAP;
    window.scrollBy({ top: naturalTop - (STACK_TOP + idx * STACK_STEP), behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-x-clip bg-gradient-to-br from-[#FFEFE4] via-[#FFF7F2] to-[#FFEDE0]">
      {/* Soft peach wave behind the header, top right */}
      <svg aria-hidden viewBox="0 0 700 260" preserveAspectRatio="none" className="pointer-events-none absolute right-0 top-0 hidden h-[260px] w-[56%] lg:block">
        <defs>
          <linearGradient id="loan-wave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFD9BF" stopOpacity="0.15" />
            <stop offset="1" stopColor="#FFC9A3" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path d="M120 0 C 220 90 330 20 430 80 C 540 145 600 100 700 150 L700 0 Z" fill="url(#loan-wave)" />
        <path d="M300 0 C 380 60 480 30 560 90 C 620 130 660 120 700 140 L700 0 Z" fill="#FFC59B" fillOpacity="0.35" />
      </svg>

      <div className="relative mx-auto max-w-[1220px] px-4 py-12 md:px-6 md:py-[64px] lg:px-8">
        <header className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8 lg:px-[10px]">
          <div className="lg:col-span-6">
            <h2 className="font-[family-name:var(--font-display)] text-[36px] font-[800] leading-[1.15] tracking-[-0.015em] text-[#141414] sm:text-[48px] lg:text-[54px]">
              <span className="relative inline-block">
                Bring your eligible
                <Sparkle className="absolute -right-12 -top-3 hidden h-10 w-11 lg:block" />
              </span>{" "}
              loans{" "}
              <span className="rounded-[14px] px-3 box-decoration-clone" style={{ background: YELLOW }}>
                together
              </span>
            </h2>
            <Link
              href="/eligibility"
              data-analytics-cta="loan_solutions_check_eligibility"
              data-analytics-location="loan_solutions"
              className="mt-7 inline-flex h-[56px] items-center gap-2 rounded-full bg-gradient-to-b from-[#FF6A14] to-[#EC4F00] px-8 text-[19px] font-semibold text-white shadow-[0_14px_26px_-12px_rgba(236,79,0,0.85)] transition-[filter] hover:brightness-105"
            >
              Check your eligibility <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          <p className="relative text-lg leading-[1.55] text-[#3A3F4B] md:text-[19px] lg:col-span-5 lg:col-start-8 lg:pt-1 lg:before:absolute lg:before:-left-7 lg:before:top-1 lg:before:h-[66px] lg:before:w-[2px] lg:before:bg-[#F2A06E]">
            One simpler way to manage multiple debts. Different loans. Different stories. One smarter way forward.
          </p>
        </header>

        <div className="mt-10 grid gap-4 md:mt-12 lg:mt-14">
          {SOLUTIONS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <article
                key={s.id}
                data-row
                // Later cards sit above earlier ones, so each slides over the one before it.
                style={{ ["--slot" as string]: `${STACK_TOP + idx * STACK_STEP}px`, zIndex: idx + 1 }}
                className="sticky top-[var(--slot)] overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-white to-[#FFF6F0] shadow-[0_12px_34px_-14px_rgba(200,90,30,0.30)]"
              >
                <div onClick={() => bringForward(idx)} className="flex h-[64px] cursor-pointer items-center px-4 sm:px-[26px]">
                  <span aria-hidden className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-[#FF7A2B] to-[#F2560A] text-white shadow-[0_8px_16px_-8px_rgba(242,86,10,0.8)]">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.9} />
                  </span>
                  <button type="button" id={`sol-btn-${s.id}`} className="min-w-0 flex-1 cursor-pointer appearance-none border-0 bg-transparent px-4 text-left focus-visible:outline-none">
                    <h3 className="text-[18px] font-[700] text-[#141414] sm:text-[20px]">{s.label}</h3>
                  </button>
                  <Link
                    href={s.cta.href}
                    aria-label={s.cta.label}
                    onClick={(e) => e.stopPropagation()}
                    data-analytics-cta={`loan_solutions_${s.id}`}
                    data-analytics-location="loan_solutions"
                    className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#F5B58A] bg-white px-4 text-[15px] font-semibold text-[#E8590C] transition-colors hover:bg-[#FFF4EC] sm:px-5 sm:text-[16px]"
                  >
                    <span className="sm:hidden">Explore</span>
                    <span className="hidden sm:inline">Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div id={`sol-panel-${s.id}`} className="relative px-4 pb-8 pt-2 sm:px-[26px] lg:px-0 lg:pb-0 lg:pt-0" style={{ ["--ar" as string]: s.panelAspect }}>
                  <div className="relative z-10 lg:flex lg:aspect-[var(--ar)] lg:w-[54%] lg:flex-col lg:justify-center lg:py-4 lg:pl-[26px]">
                    <p className="relative lg:self-start lg:whitespace-pre-line font-[family-name:var(--font-display)] text-[26px] font-[700] leading-[1.14] tracking-[-0.015em] text-[#141414] lg:text-[clamp(26px,2.7vw,36px)]">
                      {s.headline.before}
                      <span className="lg:whitespace-nowrap">
                        {s.headline.glue}
                        <span className="relative rounded-[12px] px-2.5 box-decoration-clone" style={{ background: YELLOW }}>
                          {s.headline.mark}
                        </span>
                      </span>
                      {s.headline.after}
                      <Sparkle className="absolute -right-12 -top-4 hidden h-10 w-11 lg:block" />
                    </p>

                    <div className="mt-5 grid gap-3.5 lg:mt-5">
                      {s.points.map((pt, i) => {
                        const { tile, ink } = TILES[i];
                        return (
                          <div key={pt.title} className="flex items-center gap-4">
                            <span aria-hidden className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px]" style={{ background: tile, color: ink }}>
                              <pt.Icon className="h-[24px] w-[24px]" strokeWidth={1.9} />
                            </span>
                            <p className="text-[15px] leading-snug text-[#3A3F4B] sm:text-[17px]">
                              <strong className="font-[700] text-[#141414]">{pt.title}</strong>
                              {s.inline ? " " : <br />}
                              {pt.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className="relative mx-auto mt-6 w-full max-w-[520px] lg:absolute lg:right-0 lg:top-0 lg:mx-0 lg:mt-0 lg:h-full lg:w-auto lg:max-w-none"
                    style={{
                      aspectRatio: `${s.art.w} / ${s.art.h}`,
                      WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 7%)",
                      maskImage: "linear-gradient(to right, transparent 0, #000 7%)",
                    }}
                  >
                    <Image src={s.art.src} alt="" fill quality={95} sizes="(min-width:1024px) 600px, 90vw" className="object-contain object-right" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-[#575757]">*Illustrative figures only. Final rates and terms are set by partner lenders after checking your profile.</p>
      </div>
    </section>
  );
};
