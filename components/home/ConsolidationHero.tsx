"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { passbookMonths } from "@/lib/passbookMonths";


// Illustrative example: four EMIs that total ₹28,800 a month become one EMI of ₹25,600.
const OLD_DEBITS = [
  { day: "03", label: "PERSONAL LOAN EMI", amount: "12,500", delay: "0.2s" },
  { day: "07", label: "CREDIT CARD BILL", amount: "8,300", delay: "0.8s" },
  { day: "12", label: "OD INTEREST", amount: "4,200", delay: "1.4s" },
  { day: "18", label: "APP LOAN EMI", amount: "3,800", delay: "2s" },
];

// Partner logos shown in the slider (w = desktop card width, mw = mobile card width). Yes Bank and Bajaj Finance are display-only until their entries exist in lib/lenderEngine.ts.
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
  { src: "/hero/logos/yesbank.svg", alt: "Yes Bank", w: 150, iw: 96, ih: 36 },
  { src: "/hero/logos/bajaj.svg", alt: "Bajaj Finance", w: 200, mw: 176, iw: 160, ih: 16 },
];

const ORANGE_BTN =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#FD6C01] hover:bg-[#E15F00] font-semibold text-white shadow-[0_14px_26px_-12px_rgba(225,95,0,0.35)] transition-[filter,transform] hover:brightness-105 active:translate-y-px";

const LOGO_CARD =
  "flex h-[56px] items-center justify-center rounded-xl border border-[#F5EDE7] bg-white px-3 shadow-[0_10px_24px_-14px_rgba(120,60,20,0.18)]";

const ICON = { unoptimized: true } as const;

const subscribe = () => () => {};
const clientMonthKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}`;
};

/** Month labels from the visitor's own calendar. null on the server and first paint, so nothing stale is shown or hydrated. */
function usePassbookMonths() {
  const key = useSyncExternalStore(subscribe, clientMonthKey, () => "");
  if (!key) return null;
  const [year, month] = key.split("-").map(Number);
  return passbookMonths(new Date(year, month, 1));
}

export function ConsolidationHero() {
  const months = usePassbookMonths();

  return (
    <section className="relative z-[25] w-full overflow-hidden bg-gradient-to-b from-[#FFF9F4] via-[#FFF9F4] to-[#FFF9F4] pt-[88px] xl:pt-[98px]">
      <div className="relative mx-auto max-w-[1358px] px-4 pb-10 sm:px-6 lg:px-8 xl:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-12">
          {/* ── Left: the promise ── */}
          <div className="min-w-0 pt-3">
            <p className="inline-flex min-h-9 items-center gap-2.5 rounded-2xl bg-[#FFE4CC] px-[18px] py-1.5 text-[13.5px] leading-tight font-[500] text-[#C94400] sm:rounded-full sm:text-[15.5px]">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#FD6C01]" />
              Debt Consolidation for Salaried Professionals
            </p>

            <h1 className="mt-[22px] font-[family-name:var(--font-display)] text-[42px] font-[800] leading-[1.02] text-[#252525] sm:text-[64px] lg:text-[64px] xl:text-[84px] xl:leading-[0.98] min-[1520px]:text-[96px]">
              <span className="block">One line</span>
              <span className="block">in your</span>
              <span className="block">
                <span className="inline-block bg-gradient-to-b from-[#FD6C01] to-[#FD6C01] bg-clip-text pb-[0.14em] text-transparent">
                  passbook.
                </span>
              </span>
            </h1>

            <p className="mt-4 max-w-[520px] text-[18px] leading-[28px] text-[#3D3D3D] sm:text-[20px] xl:mt-5">
              Four EMI debits a month become a single one, at a lower interest rate.
            </p>

            <div className="mt-[26px] flex flex-col gap-3 sm:flex-row sm:gap-[22px] xl:mt-[33px]">
              <Link
                href="#lead-form"
                data-analytics-cta="hero_check_eligibility"
                data-analytics-location="hero"
                className={`${ORANGE_BTN} h-[56px] px-7 text-[18px]`}
              >
                Check my eligibility
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                data-analytics-cta="hero_contact_us"
                data-analytics-location="hero"
                className="inline-flex h-[56px] items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border border-[#252525]/15 bg-white px-7 text-[18px] font-semibold text-[#252525] shadow-ambient transition-colors hover:bg-[#FFF9F4]"
              >
                Contact us
              </Link>
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

          {/* ── Right: the passbook. Month labels follow the visitor's calendar ── */}
          <div className="min-w-0">
            <div
              role="img"
              aria-label={`Example passbook: four EMI debits in one month, then a single EMI of ₹25,600 the month after.`}
              className={`pb mx-auto w-full max-w-[500px] overflow-hidden rounded-md border border-[#252525]/25 bg-[#FFF9F4] font-mono text-[#1D1D1D] shadow-standard sm:shadow-standard ${months ? "pb-live" : ""}`}
            >
              <div className="flex justify-between gap-3 bg-[#252525] px-3.5 py-3 text-[11px] tracking-[0.14em] text-white sm:px-[18px] sm:text-[12px]">
                <span>SALARY ACCOUNT</span>
                <span>{months?.header ?? ""}</span>
              </div>
              <div className="grid grid-cols-[56px_minmax(0,1fr)_64px] gap-2 border-b border-[#BBB] px-3.5 py-[9px] text-[10.5px] tracking-[0.1em] text-[#666] sm:grid-cols-[62px_minmax(0,1fr)_86px] sm:px-[18px] sm:text-[11px]">
                <span>DATE</span>
                <span>PARTICULARS</span>
                <span className="text-right">DEBIT</span>
              </div>

              {OLD_DEBITS.map((d) => (
                <div
                  key={d.label}
                  className="pb-r grid grid-cols-[56px_minmax(0,1fr)_64px] gap-2 border-b border-dashed border-[#CFC7B5] px-3.5 py-[9px] text-[12px] sm:grid-cols-[62px_minmax(0,1fr)_86px] sm:px-[18px] sm:text-[14px]"
                  style={{ ["--d" as string]: d.delay }}
                >
                  <span>{d.day} {months?.current}</span>
                  <span className="truncate">{d.label}</span>
                  <span className="text-right font-bold tabular-nums">{d.amount}</span>
                </div>
              ))}

              <div className="flex items-center justify-between gap-3 px-3.5 py-3 sm:px-[18px]">
                <span className="pb-sep-text text-[10px] tracking-[0.12em] text-[#C94400] sm:text-[11px] sm:tracking-[0.14em]">
                  - FROM NEXT MONTH -
                </span>
                <span className="pb-stamp shrink-0 whitespace-nowrap rounded-[2px] border-[3px] border-[#C94400] bg-[#FFF9F4]/70 px-2 py-0.5 font-[family-name:var(--font-display)] text-[12px] font-[800] tracking-[0.06em] text-[#C94400] sm:px-2.5 sm:text-[14px]">
                  CONSOLIDATED
                </span>
              </div>

              <div
                className="pb-r grid grid-cols-[56px_minmax(0,1fr)_64px] gap-2 bg-[#FFE4CC] px-3.5 py-[10px] text-[12px] sm:grid-cols-[62px_minmax(0,1fr)_86px] sm:px-[18px] sm:text-[14px]"
                style={{ ["--d" as string]: "3.6s" }}
              >
                <span>05 {months?.next}</span>
                <span>ONE EMI</span>
                <span className="text-right font-bold tabular-nums">25,600</span>
              </div>
            </div>
            <p className="mt-4 text-center text-[13px] text-[#6B6B6B]">Illustrative example. Your numbers will differ.</p>
          </div>
        </div>

        {/* ── Lender strip ── */}
        <div className="mt-10 min-w-0 lg:mt-12">
          <div className="hidden items-center justify-center gap-4 sm:flex xl:gap-[26px]">
            <span aria-hidden="true" className="hidden h-[2px] w-[190px] bg-gradient-to-r from-transparent to-[#FFB366] xl:block" />
            <p className="text-center text-[17px] font-[500] text-[#252525] sm:text-[20px]">
              {LOGOS.length} partner banks and NBFCs compared in one place
            </p>
            <span aria-hidden="true" className="hidden h-[2px] w-[190px] bg-gradient-to-l from-transparent to-[#FFB366] xl:block" />
          </div>
          <div
            className="lender-strip mt-[22px] py-3"
            aria-label="Partner lenders"
          >
            <ul className="lender-track flex w-max items-center">
              {[0, 1].flatMap((copy) => [
                ...LOGOS.map((l) => (
                  <li
                    key={`${copy}-${l.alt}`}
                    aria-hidden={copy === 1}
                    className="shrink-0 pr-3 xl:pr-[22px]"
                  >
                    <div className={`${LOGO_CARD} w-[var(--mw)] xl:w-[var(--w)]`} style={{ ["--w" as string]: `${l.w}px`, ["--mw" as string]: `${"mw" in l ? l.mw : 140}px` }}>
                      <Image src={l.src} alt={copy === 1 ? "" : l.alt} width={l.iw} height={l.ih} className="h-auto max-w-full" {...ICON} />
                    </div>
                  </li>
                )),
              ])}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
