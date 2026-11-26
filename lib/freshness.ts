import { staticRoutes } from "@/lib/routes";

/**
 * One source for "when did this page last change": lib/routes.ts. The same
 * date feeds the sitemap <lastmod>, the visible "Updated …" line and the
 * WebPage `dateModified` JSON-LD, so all three always agree. Google compares
 * them, and a visible date that disagrees with the markup (or that moves
 * without the content changing) is treated as a freshness trick and ignored
 * (developers.google.com/search/docs/appearance/publication-dates).
 */
export function routeLastModified(path: string): string | undefined {
  return staticRoutes.find((r) => r.path === path)?.lastModified;
}

/** "26 November 2026", in India time, whatever the build server's zone. */
export function formatIndianDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}
