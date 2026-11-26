/**
 * Single source of truth for every indexable page path, used by app/sitemap.ts
 * and (later) internal link audits. City pages (lib/cities.ts) and learning
 * center articles (content/articles.ts) are NOT listed here — they already
 * have their own canonical source and are merged in by the sitemap.
 *
 * `lastModified` must be a real content date, never `new Date()` at build
 * time: Google only honours <lastmod> when it is "consistently and verifiably
 * accurate" (developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
 * The dates below were re-checked on 2026-11-26: each is the page's last real
 * git commit date (`git log -1 --format=%aI -- <file>`), or 2026-11-26 for
 * pages whose title, description or main sections changed that day. Bump a route's date by hand only when
 * its main content, structured data or links materially change — not for
 * copyright-year or typo edits.
 *
 * `noindex: true` keeps a route out of the sitemap without removing the page
 * itself; pair it with `robots: { index: false }` in that page's metadata.
 */
export type RouteEntry = {
  path: string;
  lastModified?: string;
  noindex?: boolean;
};

export const staticRoutes: RouteEntry[] = [
  { path: '', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/about', lastModified: '2026-11-26T13:30:00+05:30' },
  { path: '/contact', lastModified: '2026-11-23T15:58:17+05:30' },
  { path: '/credit-card-debt', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/debt-consolidation', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/free-cibil-score', lastModified: '2026-11-26T14:00:00+05:30' },
  { path: '/free-credit-report', lastModified: '2026-11-26T14:00:00+05:30' },
  { path: '/eligibility', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/faq', lastModified: '2026-11-26T15:00:00+05:30' },
  { path: '/high-interest-loan', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/how-it-works', lastModified: '2026-11-26T15:00:00+05:30' },
  { path: '/loan-balance-transfer', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/partner-disclosures', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/personal-loan', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/privacy-policy', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/terms-and-conditions', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/app-loan', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/calculators', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/calculators/debt-consolidation-calculator', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/personal-loan-overdraft', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/personal-loan-emi-calculator', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/emi-savings-calculator', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/learning-center', lastModified: '2026-11-26T15:00:00+05:30' },
  { path: '/loans-by-city', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/disclaimer', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/cookie-policy', lastModified: '2026-11-26T12:00:00+05:30' },
  { path: '/grievance-redressal', lastModified: '2026-11-26T12:00:00+05:30' },
  // Public on purpose: the Play Store data-deletion policy needs a reachable URL.
  { path: '/delete-account', lastModified: '2026-11-25T18:30:43+05:30' },
];
