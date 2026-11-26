import { ArrowRight, Check } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { LastUpdated } from "@/components/LastUpdated";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/structuredData";

type Props = {
  title: string;
  body: string;
  cta: string;
  points?: string[];
  /** Where the secondary button goes: the full eligibility check further down the page. */
  href?: string;
  /** The page's route path (e.g. "/personal-loan"). When set, shows the
   * "Updated <date>" stamp from lib/routes.ts under the points. */
  updatedPath?: string;
  /** Set false when something above (e.g. breadcrumbs under the page's own navbar spacer) already clears the navbar. */
  spacer?: boolean;
  /** Visible breadcrumb band plus BreadcrumbList JSON-LD, rendered between the navbar spacer and the hero. */
  breadcrumbs?: BreadcrumbItem[];
  /** Preselects the form's "What can we help you with?". Defaults from the page's route. */
  requirement?: string;
  /** City this page is for, sent with the lead. */
  city?: string;
};

export function ProductHero({ title, body, cta, points = [], href = "#lead-form", updatedPath, spacer = true, breadcrumbs, requirement, city }: Props) {
  return (
    <>
    {spacer && <div className="h-[84px] bg-white" aria-hidden="true" />}
    {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
    <section className="w-full bg-[#FFF3E8] text-[#252525] border-b border-[#F0E3D8]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14 lg:py-[72px] grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-x-16 gap-y-8 lg:gap-y-0">
        <div className="lg:self-end">
          <h1 className="hero-title text-[clamp(34px,9vw,42px)] sm:text-5xl lg:text-[52px] leading-[1.04] tracking-[-0.04em] font-semibold max-w-2xl">
            {title}
          </h1>
          <p className="hero-description mt-5 text-base sm:text-lg leading-[1.55] text-[#4A4540] max-w-xl">{body}</p>
        </div>
        <div className="w-full lg:max-w-[520px] lg:ml-auto lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
          <ContactForm variant="card" location="hero" defaultRequirement={requirement} city={city} />
        </div>
        <div className="lg:self-start">
          {points.length > 0 && (
            <ul className="mt-1 lg:mt-7 space-y-2.5 text-base sm:text-[17px] text-[#252525]">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-[18px] w-[18px] shrink-0 text-[#E15F00]" strokeWidth={2.5} aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
          <a
            href={href}
            data-analytics-cta={`hero_${cta.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}`}
            data-analytics-location="product_hero"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[#252525]/25 bg-white/60 text-[#252525] font-semibold text-[18px] px-7 h-[56px] hover:bg-[#252525] hover:text-white hover:border-[#252525] transition-colors"
          >
            {cta} <ArrowRight className="w-5 h-5" />
          </a>
          {updatedPath && <LastUpdated path={updatedPath} className="mt-6 text-[#252525]/70" />}
        </div>
      </div>
    </section>
    </>
  );
}
