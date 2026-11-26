import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { breadcrumbSchema, jsonLd, type BreadcrumbItem } from "@/lib/structuredData";

/**
 * Renders a visible breadcrumb trail AND its matching BreadcrumbList JSON-LD
 * from the same data, so they can never drift apart like the calculator
 * page's previous hand-written schema did (its item 2 repeated item 3's
 * URL). Google shows breadcrumbs on desktop results only (since Jan 2025),
 * but recommends keeping the markup regardless.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(items)) }} />
      {/* A full-width strip with its own even padding, so it reads as one band between the navbar and the page
          instead of loose text. On narrow screens the trail wraps rather than clipping the current page. */}
      <nav aria-label="Breadcrumb" className="border-b border-[#E5E5E5] bg-[#FFF9F4]">
        <ol
          role="list"
          className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-sm text-[#626262]"
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            const isHome = i === 0 && item.path === "/";
            return (
              <li key={`${item.name}-${i}`} className="flex items-center gap-1.5 first:-ml-2">
                {isLast || !item.path ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="rounded-full bg-[#FFE4CC] px-3 py-1 font-semibold text-[#252525]"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-medium hover:bg-[#FFE4CC]/60 hover:text-[#252525] transition-colors"
                  >
                    {isHome && <Home className="h-4 w-4" aria-hidden="true" />}
                    <span className={isHome ? "sr-only sm:not-sr-only" : undefined}>{item.name}</span>
                  </Link>
                )}
                {!isLast && <ChevronRight className="h-4 w-4 text-[#A3A3A3]" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
