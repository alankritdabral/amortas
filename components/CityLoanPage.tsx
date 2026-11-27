import Link from "next/link";
import { ProductHero } from "@/components/ProductHero";
import { Eligibility } from "@/components/Eligibility";
import { DebtConsolidation } from "@/components/DebtConsolidation";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";
import type { PageKey } from "@/lib/pageContent";
import { cities, type City } from "@/lib/cities";
import { CityOptionTabs, CityOptionsGrid } from "@/components/city/CityOptions";
import { cityHubPath, cityPagePath, productDef, type CityProduct } from "@/lib/cityPages";
import { contact } from "@/lib/config";
import { factsFor } from "@/lib/cityFacts";
import { CityLocalNotes } from "@/components/city/CityLocalNotes";
import { MapPin } from "lucide-react";

type Copy = {
  pageKey: PageKey;
  title: (c: string) => string;
  body: string;
  cta: string;
  image: string;
  points: (c: string) => string[];
  helpHeading: (c: string) => string;
  help: { t: string; d: string }[];
  /** Replaces the default eligibility block for this product. */
  showDebtBlock?: boolean;
};

const copy: Record<CityProduct, Copy> = {
  "personal-loan": {
    pageKey: "city",
    title: (c) => `Salaried in ${c}? Let's find you a better loan.`,
    body: "Whether you want a fresh personal loan or to bring several EMIs into one, we'll check your options with partner banks. Rates start from 9.99% p.a.* for eligible salaried applicants.",
    cta: "Check my eligibility",
    image: "/img/personal-loan-couple-reviewing-offer.webp",
    points: (c) => [`Free to check, from anywhere in ${c}`, "Made for salaried professionals", "You decide whether to go ahead"],
    helpHeading: (c) => `What we can help you with in ${c}.`,
    help: [
      { t: "A fresh personal loan", d: "Explore options based on your income, employer category and credit profile." },
      { t: "One EMI instead of many", d: "Combine personal loans, card dues and app loans if it genuinely lowers your cost." },
      { t: "A cheaper rate on a loan you already have", d: "See whether moving your balance to a partner bank would save you money." },
    ],
  },
  "quick-loan": {
    pageKey: "personal-loan",
    title: (c) => `Need money soon in ${c}? See your quick loan options.`,
    body: "How fast a loan arrives depends on the lender and on how ready your documents are. We show which partner lenders you are likely to qualify for first, so you apply where it can work.",
    cta: "Check my eligibility",
    image: "/img/personal-loan-couple-reviewing-offer.webp",
    points: (c) => [`Free to check, from anywhere in ${c}`, "Know where you are likely eligible before you apply", "No promise of approval or timing"],
    helpHeading: (c) => `Getting a loan faster in ${c}, honestly.`,
    help: [
      { t: "Have documents ready", d: "PAN, Aadhaar, recent salary slips and bank statements are commonly needed. Having them to hand is the biggest thing you control." },
      { t: "Apply where you fit", d: "Applying to lenders that suit your profile avoids rejections, and each formal application leaves an enquiry on your credit report." },
      { t: "Compare cost, not just speed", d: "Faster products can carry higher rates or fees. Check the Key Fact Statement and the total you will repay. Be wary of any offer that asks you to pay first." },
    ],
  },
  overdraft: {
    pageKey: "overdraft",
    title: (c) => `Need flexible cash in ${c}? Look at overdraft options.`,
    body: "If your salary doesn't always stretch to month-end, an overdraft or credit line can help. We'll also check if another route would cost you less.",
    cta: "Check my overdraft options",
    image: "/img/overdraft-credit-line-salaried.webp",
    points: (c) => [`Free to check, from anywhere in ${c}`, "For salaried professionals", "No pressure to go ahead"],
    helpHeading: (c) => `How an overdraft can work for you in ${c}.`,
    help: [
      { t: "A limit you can draw from", d: "Instead of one lump sum, you get a limit and use what you need, when you need it." },
      { t: "Interest on what you use", d: "With many overdraft and credit-line products, interest is charged on the amount drawn, not the whole limit. Terms vary by lender." },
      { t: "Not always the cheapest", d: "If you stay in overdraft for long, the cost can add up. We'll tell you if a personal loan would work out better." },
    ],
  },
  "debt-consolidation": {
    pageKey: "debt-consolidation",
    title: (c) => `Too many EMIs in ${c}? Turn them into one.`,
    body: "Stop juggling due dates and high card interest. See whether combining your loans and cards into one plan could lower what you pay each month.",
    cta: "Check my options",
    image: "/img/debt-consolidation-multiple-emis.webp",
    points: (c) => [`Free assessment, from anywhere in ${c}`, "One due date, one payment", "Honest answer, even if it isn't worth it"],
    helpHeading: (c) => `How consolidation can help borrowers in ${c}.`,
    help: [
      { t: "One EMI, one due date", d: "Replace several personal loans, card balances and app loans with a single payment." },
      { t: "A lower cost, if the numbers work", d: "It helps when the new loan costs less overall than the debts it replaces, including fees and any foreclosure charges." },
      { t: "An honest no", d: "If consolidating would not save you money, we will say so." },
    ],
    showDebtBlock: true,
  },
};

export function CityLoanPage({ city, product = "personal-loan" }: { city: City; product?: CityProduct }) {
  const c = copy[product];
  const def = productDef(product);
  const office = contact.addresses.find((a) => a.city === city.name);
  const nearOffice = !office && city.nearestOffice ? contact.addresses.find((a) => a.city === city.nearestOffice) : null;
  const sameState = cities.filter((x) => x.slug !== city.slug && x.state === city.state);
  const facts = factsFor(city);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-[84px]" aria-hidden="true" />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Loans by city", path: "/loans-by-city" },
          { name: city.name, path: cityHubPath(city.slug) },
          { name: def.title },
        ]}
      />
      <ProductHero
        spacer={false}
        city={city.name}
        title={c.title(city.name)}
        body={c.body}
        cta={c.cta}
        points={c.points(city.name)}
      />

      <CityOptionTabs city={city} activeKey={product} />

      <PageIntro page={c.pageKey} />

      <section className="section-tint text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold">{c.helpHeading(city.name)}</h2>
          <div>
            {c.help.map((i, n) => (
              <div key={i.t} className={`px-5 md:px-7 py-7 ${n % 2 === 0 ? "bg-[#FFE4CC]" : ""}`}>
                <h3 className="text-2xl md:text-[32px] leading-tight tracking-[-0.02em] font-bold">{i.t}</h3>
                <p className="mt-2 text-lg text-[#626262] leading-relaxed max-w-lg">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tint text-[#252525] border-t border-[#E5E5E5]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
          <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">
            {office ? `Visit us in ${city.name}.` : `Working with us from ${city.name}.`}
          </h2>
          <p className="mt-4 text-lg text-[#626262] leading-relaxed max-w-3xl">
            You can check your options online from {city.name}, {city.state}, and a credit specialist will call you back.
            Lenders set their own eligibility rules, so what you can get depends on your income, employer, credit profile
            and existing EMIs, not on where you live.
          </p>
          {(office || nearOffice) && (
            <div className="mt-6 flex items-start gap-3 max-w-2xl">
              <MapPin className="h-6 w-6 shrink-0 text-[#E15F00] mt-0.5" />
              <p className="text-lg text-[#626262] leading-relaxed">
                {office ? office.fullAddress : `Our nearest office is in ${nearOffice!.city}: ${nearOffice!.fullAddress}`}
              </p>
            </div>
          )}
        </div>
      </section>

      {facts && <CityLocalNotes city={city} facts={facts} />}

      {c.showDebtBlock ? <DebtConsolidation /> : <Eligibility />}
      <LoanCalculator />
      <PageProof page={c.pageKey} />
      <LeadForm />

      <CityOptionsGrid
        city={city}
        activeKey={product}
        heading={`All options in ${city.name}.`}
        intro={`Not the right fit? These are the other ways we can help in ${city.name}. Open any of them.`}
      />

      <section className="section-tint text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
          {sameState.length > 0 && (
            <>
              <h2 className="mt-12 text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">
                {def.title} elsewhere in {city.state}
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {sameState.map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={cityPagePath(product, x.slug)}
                      className="inline-block rounded bg-white hover:bg-[#FD6C01] hover:text-[#252525] transition-colors px-5 py-3 text-base font-semibold"
                    >
                      {x.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="mt-10 text-base">
            <Link href={cityHubPath(city.slug)} className="font-semibold underline">Everything for {city.name}</Link>
            {" · "}
            <Link href="/loans-by-city" className="font-semibold underline">All cities</Link>
            {" · "}
            <Link href={def.hub} className="font-semibold underline">{def.hubLabel} in India</Link>
          </p>
          <p className="mt-6 text-sm text-[#626262] max-w-3xl">
            *Rates depend on credit profile, income, employer, existing obligations, loan amount, tenure and lender policy.
            For eligible salaried applicants only. Approval and timing are decided by the lender.
          </p>
        </div>
      </section>
    </div>
  );
}
