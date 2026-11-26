import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DocToc } from "@/components/legal/DocToc";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";
import { company, contact, LEGAL_LAST_UPDATED } from "@/lib/config";

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy", note: "What we collect and your rights" },
  { href: "/terms-and-conditions", label: "Terms & Conditions", note: "Rules for using this website" },
  { href: "/disclaimer", label: "Disclaimer", note: "What we are, and are not" },
  { href: "/cookie-policy", label: "Cookie Policy", note: "Cookies and tracking choices" },
  { href: "/partner-disclosures", label: "Partner Disclosures", note: "Lenders and how we are paid" },
  { href: "/grievance-redressal", label: "Grievance Redressal", note: "How to raise a complaint" },
];

/** Shared shell for the legal pages (privacy, terms, disclaimer, cookies, partners, grievance). */
export function LegalPage({
  title,
  intro,
  eyebrow = "Legal",
  path,
  children,
}: {
  title: string;
  intro?: string;
  eyebrow?: string;
  /** Route path: shows the "Updated" date and emits matching WebPage JSON-LD. */
  path?: string;
  children: ReactNode;
}) {
  const related = LEGAL_LINKS.filter((l) => l.label !== title);
  return (
    <div className="min-h-screen bg-white text-[#252525]">
      <div className="h-[84px] bg-white" aria-hidden="true" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: title }]} />
      <section className="bg-[#FFF3E8] border-b border-[#F0E3D8]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
          <p className="text-base font-semibold">{eyebrow}</p>
          <h1 className="mt-3 text-[clamp(36px,8vw,56px)] leading-[1.02] tracking-[-0.04em] font-medium max-w-3xl">{title}</h1>
          {intro && <p className="mt-5 text-lg md:text-xl leading-[1.5] max-w-2xl">{intro}</p>}
          {path ? (
            <LastUpdated path={path} className="mt-6 inline-flex items-center rounded bg-white/90 px-3 py-1.5 font-semibold" />
          ) : (
            <p className="mt-6 inline-flex items-center rounded bg-white/90 px-3 py-1.5 text-sm font-semibold">
              Last updated: {LEGAL_LAST_UPDATED}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-[110px]">
            <DocToc target="#doc-body" />
          </div>
        </aside>
        <div className="min-w-0 max-w-3xl">
          <div id="doc-body" className="doc-prose">
            {children}
          </div>
          <CompanyBlock />
        </div>
      </div>

      <section className="section-tint">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <h2 className="text-[28px] md:text-[32px] leading-tight tracking-[-0.02em] font-bold">Related policies</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex h-full items-center justify-between gap-4 rounded-lg border border-[#E7E2DD] bg-white p-5 transition-colors hover:border-[#252525]"
                >
                  <span>
                    <span className="block font-semibold">{l.label}</span>
                    <span className="mt-0.5 block text-sm text-[#626262]">{l.note}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[#626262]">
            Questions about any of these? Email{" "}
            <a className="font-semibold text-[#252525] underline underline-offset-4" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>{" "}
            or use the <Link className="font-semibold text-[#252525] underline underline-offset-4" href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}

/** Registered-entity details. Renders only the fields that have been filled in. */
export function CompanyBlock() {
  const rows: [string, string][] = [
    ["Legal entity", company.legalEntityName],
    ["CIN", company.cin],
    ["Registered office", company.registeredOffice],
    ["GSTIN", company.gstin],
  ];
  const filled = rows.filter(([, v]) => v);
  return (
    <div className="mt-14 rounded-lg bg-[#FFF8F3] border border-[#E7E2DD] p-6 text-sm text-[#444140]">
      <p className="font-semibold text-[#252525] mb-2">About the operator of this website</p>
      <p>
        {contact.legalName} operates this website
        {company.legalEntityName ? ` through ${company.legalEntityName}` : ""}.
      </p>
      {filled.length > 0 && (
        <dl className="mt-2 space-y-1">
          {filled.map(([k, v]) => (
            <div key={k}>
              <dt className="inline font-medium">{k}: </dt>
              <dd className="inline">{v}</dd>
            </div>
          ))}
        </dl>
      )}
      <p className="mt-2">
        Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
    </div>
  );
}

/** Grievance / data-protection contact line used in several legal pages. */
export function grievanceEmail(): string {
  return company.grievanceOfficer.email || contact.email;
}
