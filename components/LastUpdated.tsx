import { siteConfig } from "@/lib/config";
import { formatIndianDate, routeLastModified } from "@/lib/freshness";
import { jsonLd } from "@/lib/structuredData";

/**
 * Visible "Updated <date>" stamp plus matching WebPage JSON-LD, both read
 * from the page's `lastModified` in lib/routes.ts. Renders nothing when the
 * route has no recorded date, rather than inventing one.
 *
 * To move the date: change the route's `lastModified` in lib/routes.ts, and
 * only when the page's content materially changed.
 */
export function LastUpdated({ path, className = "" }: { path: string; className?: string }) {
  const iso = routeLastModified(path);
  if (!iso) return null;

  const url = `${siteConfig.url}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    inLanguage: "en-IN",
    dateModified: iso,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <p className={`text-sm ${className}`}>
        Updated <time dateTime={iso}>{formatIndianDate(iso)}</time>
      </p>
    </>
  );
}
