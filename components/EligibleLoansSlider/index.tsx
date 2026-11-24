"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { loanCategories } from "./loanData";

// Darker than the brand orange so white text on it passes WCAG AA.
const ORANGE = "#C94400";
// Highlighter behind the key phrase; same amber as the rest of the site.
const AMBER = "#F7E0D4";

/**
 * Option D: one open card, four slim strips. Click (or Enter/Space) to swap.
 * Desktop is a row that grows/shrinks; phones get a stacked accordion.
 */
export const EligibleLoansSlider = () => {
  const [open, setOpen] = useState(loanCategories[0].id);

  return (
    <section className="relative w-full overflow-hidden bg-[#17171B] py-12 md:py-20">
      <div className="mx-auto max-w-[1220px] px-4 md:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#B8B8C0] md:mb-4 md:text-sm">
            Bring Your Eligible Loans Together
          </p>
          <h2 className="mx-auto max-w-[300px] text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-white md:max-w-none md:text-[38px] lg:text-[46px]">
            Different Loans.{" "}
            <span className="whitespace-nowrap rounded-[12px] px-2.5 text-[#141414] box-decoration-clone" style={{ background: AMBER }}>
              One Lower EMI.
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 lg:h-[470px] lg:flex-row">
          {loanCategories.map((c, i) => {
            const isOpen = open === c.id;
            const panelId = `eligible-panel-${c.id}`;
            return (
              <article
                key={c.id}
                className={`relative min-w-0 overflow-hidden rounded-[24px] transition-[flex-grow,background-color] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none lg:flex lg:basis-0 lg:flex-col ${
                  isOpen ? "lg:grow-[4.2]" : "bg-[#2A2A30] hover:bg-[#33333B] lg:grow-[1]"
                }`}
                style={isOpen ? { background: ORANGE } : undefined}
              >
                {/* Photo shows on the slim desktop strips only */}
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 200px, 0px"
                  className={`hidden object-cover transition-opacity duration-500 motion-reduce:transition-none lg:block ${isOpen ? "opacity-0" : "opacity-35"}`}
                />

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(c.id)}
                  className={`relative flex w-full items-center gap-4 p-4 text-left text-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white lg:p-6 ${
                    isOpen ? "" : "lg:h-full lg:flex-col lg:items-start lg:justify-between"
                  }`}
                >
                  <span aria-hidden className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl bg-white">
                    {c.icon}
                  </span>
                  <span className="flex flex-1 items-center gap-3 lg:flex-none">
                    <span aria-hidden className="text-[13px] font-bold opacity-80 max-lg:hidden">
                      0{i + 1}
                    </span>
                    <h3 className={`text-[19px] font-[700] lg:text-[20px] ${isOpen ? "" : "lg:rotate-180 lg:[writing-mode:vertical-rl]"}`}>
                      {c.title}
                    </h3>
                  </span>
                  <ChevronDown aria-hidden className={`h-5 w-5 shrink-0 transition-transform duration-300 lg:hidden ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  id={panelId}
                  inert={!isOpen}
                  className={`relative grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="px-4 pb-5 pt-1 lg:min-w-[380px] lg:px-6 lg:pb-6">
                      <p className="max-w-[460px] text-[16px] leading-snug text-white lg:text-[17px]">{c.description}</p>
                      {/* Example panel: the data file styles it for a light surface, so give it one. */}
                      <div className="mt-4 rounded-2xl bg-white p-4 text-slate-800">
                        {c.renderActiveContent()}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center gap-5 md:mt-10">
          <Link
            href="/eligibility"
            data-analytics-cta="eligible_loans_check_eligibility"
            data-analytics-location="eligible_loans"
            className="inline-flex h-[52px] items-center gap-2 rounded-full px-8 text-[17px] font-semibold text-white transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ background: ORANGE }}
          >
            Check your eligibility <ChevronRight className="h-5 w-5" />
          </Link>
          {/* "10,000+ Users" and "4.9 Rating" were removed here: unsourced numbers with nothing behind them. */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {["Real-time insights", "Secure & compliant"].map((badge) => (
              <div key={badge} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white md:px-5 md:py-2.5 md:text-sm">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
