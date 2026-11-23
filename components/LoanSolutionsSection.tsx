"use client";

import React from "react";
import { ArrowRight, Banknote, CalendarDays, ChevronRight, Coins, CreditCard, Landmark, Layers, Percent, Scale, Smartphone, Zap, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LoanStage, type StageScene } from "./LoanStage";
import { track } from "@/lib/analytics/track";

type Stat = { lead: string; text: string };
type Solution = {
  id: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  stats: [Stat, Stat, Stat];
  cta: { label: string; href: string };
  scene: StageScene;
  /** Optional look overrides, used where a card is built to match a supplied mock. */
  iconBg?: string;
  highlight?: { before: string; mark: string; after?: string; glue?: string; bg?: string; spark?: string };
  tone?: string;
  points?: [{ title: string; desc: string }, { title: string; desc: string }, { title: string; desc: string }];
  art?: { src: string; w: number; h: number; fade?: boolean };
};

const SOLUTIONS: Solution[] = [
  {
    id: "personal-loan",
    label: "Personal Loan",
    icon: Smartphone,
    headline: "Make your monthly repayments more manageable.",
    stats: [
      { lead: "Compare options", text: "from partner lenders in one place" },
      { lead: "Choose a tenure", text: "that fits your monthly budget" },
      { lead: "No obligation", text: "to proceed after you see your options" },
    ],
    cta: { label: "Check your EMI options", href: "#calculator" },
    scene: { kind: "phone", tint: "rgba(46, 46, 46, 0.06)" },
    art: { src: "/hero/loan-phone.webp", w: 750, h: 447, fade: true },
  },
  {
    id: "credit-card",
    label: "Credit Card",
    icon: CreditCard,
    headline: "Reduce the burden of expensive credit-card debt.",
    stats: [
      { lead: "40% p.a. or more", text: "can be charged on card dues" },
      { lead: "A personal loan", text: "may bring that rate down" },
      { lead: "One fixed EMI", text: "instead of a revolving balance" },
    ],
    cta: { label: "Explore card debt options", href: "/credit-card-debt" },
    scene: { kind: "card", tint: "rgba(46, 46, 46, 0.05)", rate: { from: 45, to: 11 } },
    iconBg: "#1D3FA0",
    highlight: { before: "Reduce the burden of expensive ", mark: "credit-card debt." },
    points: [
      { title: "Get a lower interest rate", desc: "Reduce high credit card interest into a single, lower rate." },
      { title: "Flexible repayment tenure", desc: "Choose a duration that fits your monthly budget." },
      { title: "One simple EMI", desc: "Convert multiple card dues into one easy EMI." },
    ],
    art: { src: "/hero/credit-card-art3.webp", w: 952, h: 655 },
  },
  {
    id: "app-loans",
    label: "App Loans",
    icon: Smartphone,
    headline: "Bring scattered app loans into a clearer plan.",
    stats: [
      { lead: "Steep rates", text: "are common on short-term app loans" },
      { lead: "Combine eligible ones", text: "into a single EMI" },
      { lead: "One due date", text: "to remember instead of several" },
    ],
    cta: { label: "See app loan options", href: "/app-loan" },
    scene: {
      kind: "merge",
      tint: "rgba(46, 46, 46, 0.08)",
      emi: 15999,
      chips: [
        { amount: 8000, name: "App loan A", icon: Smartphone },
        { amount: 5500, name: "App loan B", icon: Smartphone },
        { amount: 3200, name: "App loan C", icon: Smartphone },
        { amount: 2800, name: "Other app loan", icon: Banknote },
      ],
    },
    iconBg: "#14124A",
    tone: "#1B1A4A",
    highlight: { before: "Bring scattered ", mark: "app loans", after: " into a clearer plan.", bg: "#FBD21E", spark: "#FACC15" },
    points: [
      { title: "Lower rates", desc: "Get better interest rates than multiple app loans." },
      { title: "Combine & simplify", desc: "Merge all your app loans into a single EMI." },
      { title: "One due date", desc: "No more multiple reminders and penalties." },
    ],
    art: { src: "/hero/app-loans-art.webp", w: 852, h: 673 },
  },
  {
    id: "multiple-loans",
    label: "Multiple Loans",
    icon: Layers,
    headline: "Replace multiple payments with one simpler repayment.",
    stats: [
      { lead: "Mix loan types", text: "personal loans, cards, overdrafts and app loans" },
      { lead: "One EMI", text: "and one due date each month" },
      { lead: "Illustrative figures;", text: "actual terms depend on your profile" },
    ],
    cta: { label: "Explore debt consolidation", href: "/debt-consolidation" },
    scene: {
      kind: "merge",
      tint: "rgba(46, 46, 46, 0.1)",
      emi: 24999,
      chips: [
        { amount: 12500, name: "Personal Loan", icon: Banknote },
        { amount: 8300, name: "Credit Card", icon: CreditCard },
        { amount: 4200, name: "Overdraft", icon: Landmark },
        { amount: 3800, name: "App Loan", icon: Smartphone },
      ],
    },
    iconBg: "#14124A",
    tone: "#1B1A4A",
    highlight: { before: "Replace multiple payments ", glue: "with ", mark: "one simpler repayment.", bg: "#FBD21E", spark: "#FACC15" },
    points: [
      { title: "Mix loan types", desc: "Personal loans, cards, overdrafts and app loans." },
      { title: "One EMI, one due date", desc: "Keep it simple with a single monthly payment." },
      { title: "Lower overall cost", desc: "Get a reduced interest rate and save more." },
    ],
    art: { src: "/hero/multiple-loans-art2.webp", w: 946, h: 663 },
  },
  {
    id: "overdraft",
    label: "Overdraft",
    icon: Landmark,
    headline: "Explore options for expensive overdraft debt.",
    stats: [
      { lead: "Interest adds up", text: "when overdraft balances linger" },
      { lead: "A fixed-tenure loan", text: "can make repayment predictable" },
      { lead: "See what you may qualify for", text: "before you decide" },
    ],
    cta: { label: "Check overdraft options", href: "/personal-loan-overdraft" },
    scene: { kind: "rate", tint: "rgba(255, 218, 0,0.07)", rate: { from: 14, to: 11.75 } },
    iconBg: "#0F6B4B",
    tone: "#12122E",
    highlight: { before: "Explore options for ", glue: "expensive ", mark: "overdraft debt.", bg: "#FFC61A", spark: "#16A34A" },
    points: [
      { title: "Interest add-up fast", desc: "Overdrafts often come with higher, ongoing rates." },
      { title: "A fixed-tenure loan", desc: "Bring down your rate and repay in a set timeline." },
      { title: "Save more", desc: "Lower your interest cost and improve cash flow." },
    ],
    art: { src: "/hero/overdraft-art.webp", w: 954, h: 677 },
  },
];

// As on stripe.com/in: every card stays open and sticks STACK_STEP below the previous one;
// later cards slide over earlier ones, leaving only each earlier card's header strip showing.
const STACK_TOP = 16;
const STACK_STEP = 68;

// Tinted icon tiles for the three points on each card: [tile colour, icon colour].
const POINT_STYLES: { Icon: LucideIcon; tile: string; ink: string }[] = [
  { Icon: Scale, tile: "#FDEEE4", ink: "#EA580C" },
  { Icon: CalendarDays, tile: "#E8EFFD", ink: "#2F63D8" },
  { Icon: Zap, tile: "#E6F5EC", ink: "#16A34A" },
];

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
    for (let i = 0; i < idx; i++) naturalTop += rows[i].offsetHeight;
    window.scrollBy({ top: naturalTop - (STACK_TOP + idx * STACK_STEP), behavior: "smooth" });
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#FDF1E9] via-[#FFF8F4] to-[#FDF0E8]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
        {/* Header: title + action on the left, description on the right (Stripe's section-header) */}
        <header className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 lg:items-start lg:px-[26px]">
          <div className="lg:col-span-6">
            <h2 className="font-[family-name:var(--font-display)] text-[36px] sm:text-[48px] lg:text-[54px] font-[700] leading-[1.22] tracking-[-0.015em] text-[#141414]">
              Bring your eligible loans <span className="rounded-[14px] bg-[#FDE493] px-3 box-decoration-clone">together</span>
            </h2>
            <Link
              href="/eligibility"
              data-analytics-cta="loan_solutions_check_eligibility"
              data-analytics-location="loan_solutions"
              className="mt-7 inline-flex h-[56px] items-center gap-2 rounded-full bg-gradient-to-b from-[#F4600F] to-[#E24C04] px-8 text-[19px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(226,76,4,0.8)] transition-[filter] hover:brightness-105"
            >
              Check your eligibility <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="relative lg:col-span-5 lg:col-start-8 lg:pl-0 text-lg md:text-[19px] leading-[1.55] text-[#3A3F4B] lg:pt-1 lg:before:absolute lg:before:-left-9 lg:before:top-1 lg:before:h-[62px] lg:before:w-px lg:before:bg-[#E9DAD0]">
            One simpler way to manage multiple debts. Different debts. Different stories. One smarter way forward.
          </p>
        </header>

        <div className="mt-12 md:mt-16">
          {SOLUTIONS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                data-row
                // Later cards sit above earlier ones, so each slides over the one before it.
                style={{ ["--slot" as string]: `${STACK_TOP + idx * STACK_STEP}px`, zIndex: idx + 1 }}
                className="sticky top-[var(--slot)] overflow-hidden rounded-[26px] bg-white shadow-[0_10px_34px_-12px_rgba(150,80,40,0.28)]"
              >
                <div onClick={() => bringForward(idx)} className="flex h-[68px] items-center gap-0 border-b border-[#F4ECE6] px-4 sm:px-[30px] cursor-pointer group">
                  <span aria-hidden className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-[#1E1E1E] text-white" style={s.iconBg ? { background: s.iconBg } : undefined}>
                    <Icon className="w-[22px] h-[22px]" />
                  </span>

                  <button
                    type="button"
                    id={`sol-btn-${s.id}`}
                    className="flex-1 min-w-0 px-4 text-left bg-transparent border-0 appearance-none cursor-pointer focus-visible:outline-none"
                  >
                    <h3 className="text-[18px] sm:text-[20px] leading-10 font-[600] text-[#141414]">{s.label}</h3>
                  </button>

                  <Link
                    href={s.cta.href}
                    aria-label={s.cta.label}
                    onClick={(e) => e.stopPropagation()}
                    data-analytics-cta={`loan_solutions_${s.id}`}
                    data-analytics-location="loan_solutions"
                    className={`ml-auto shrink-0 inline-flex h-11 items-center gap-1 rounded-full border bg-white px-4 sm:px-5 text-sm sm:text-[17px] font-semibold text-[#141414] transition-colors ${s.points ? "border-[#CFD2DC] hover:bg-[#F5F6FA]" : "border-[#F6D9C6] hover:bg-[#FFF6F0]"}`}
                  >
                    <span className="sm:hidden">Explore</span>
                    <span className="hidden sm:inline">Learn more</span>
                    <ArrowRight className="w-4 h-4 sm:hidden" />
                    {s.points ? <ArrowRight className="w-4 h-4 hidden sm:block" /> : <ChevronRight className="w-4 h-4 hidden sm:block" />}
                  </Link>
                </div>

                <div
                  id={`sol-panel-${s.id}`}
                  className="relative grid grid-cols-1 min-w-0 px-4 pt-6 pb-8 sm:px-[30px] lg:grid-cols-[7fr_5fr] lg:gap-x-8 lg:grid-rows-[auto_auto_1fr] lg:pb-8 lg:min-h-[440px]"
                >
                  <p className="relative z-10 pb-3 font-[family-name:var(--font-display)] text-[26px] lg:text-[42px] leading-[1.12] tracking-[-0.015em] font-[700] lg:col-start-1 lg:row-start-1 lg:pt-4" style={{ color: s.tone ?? "#141414" }}>
                    {s.highlight ? (
                      <>
                        {s.highlight.before}
                        <span className="lg:whitespace-nowrap">
                          {s.highlight.glue}
                        <span className="relative rounded-[14px] px-3 box-decoration-clone" style={{ background: s.highlight.bg ?? "#FFC53D" }}>
                          {s.highlight.mark}
                          <svg aria-hidden viewBox="0 0 44 40" className="absolute -right-9 -top-7 hidden h-10 w-11 lg:block" fill="none" stroke={s.highlight.spark ?? "#F97316"} strokeWidth="3.5" strokeLinecap="round">
                            <path d="M8 18 L4 4" />
                            <path d="M22 14 L34 4" />
                            <path d="M28 26 L40 24" />
                          </svg>
                        </span>
                        </span>
                        {s.highlight.after}
                      </>
                    ) : (
                      s.headline
                    )}
                  </p>

                  <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-3">
                    {s.art ? (
                      <div
                        aria-hidden="true"
                        className="relative mx-auto mt-4 w-full max-w-[560px] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[58%] lg:max-w-none"
                        style={{
                          aspectRatio: `${s.art.w} / ${s.art.h}`,
                          ...(s.art.fade ? { WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 12%)", maskImage: "linear-gradient(to right, transparent 0, #000 12%)" } : {}),
                        }}
                      >
                        <Image src={s.art.src} alt="" fill sizes="(min-width:1024px) 680px, 90vw" className={`object-contain object-right-bottom ${s.art.fade ? "lg:object-cover lg:object-right" : ""}`} />
                      </div>
                    ) : (
                      <LoanStage scene={s.scene} still className="max-sm:h-[300px] lg:!h-[440px]" />
                    )}
                  </div>

                  <div className="relative z-10 grid gap-[14px] pt-4 pb-2 lg:col-start-1 lg:row-start-2 lg:pt-6">
                    {s.stats.map((st, i) => {
                      const { Icon: PIcon, tile, ink } = POINT_STYLES[i % POINT_STYLES.length];
                      const pt = s.points?.[i];
                      if (pt) {
                        const TIcon = i === 0 ? (s.id === "overdraft" ? Coins : s.id === "app-loans" || s.id === "multiple-loans" ? Layers : Percent) : PIcon;
                        return (
                          <div key={pt.title} className="flex items-center gap-5">
                            <span aria-hidden className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-2xl" style={{ background: tile, color: ink }}>
                              <TIcon className="h-[28px] w-[28px]" strokeWidth={1.9} />
                            </span>
                            <div>
                              <p className="text-[17px] sm:text-[20px] font-[700] leading-tight text-[#141414]">{pt.title}</p>
                              <p className="mt-1 text-[14px] sm:text-[16px] leading-snug text-[#4B5160]">{pt.desc}</p>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={st.lead} className="flex items-center gap-4">
                          <span aria-hidden className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-2xl" style={{ background: tile, color: ink }}>
                            <PIcon className="h-[26px] w-[26px]" strokeWidth={1.8} />
                          </span>
                          <p className="text-[16px] sm:text-[18px] leading-snug text-[#3A3F4B] [text-wrap:pretty]">
                            <strong className="font-[700] text-[#141414]">{st.lead}</strong> {st.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-[#575757]">*Illustrative figures only. Final rates and terms are set by partner lenders after checking your profile.</p>
      </div>
    </section>
  );
};
