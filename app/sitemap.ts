import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { staticRoutes } from '@/lib/routes';
import { CITY_PAGES_LAST_MODIFIED } from '@/lib/cities';
import { cities } from '@/lib/cities';
import { allCityPages, cityHubPath, cityPagePath, isHubIndexed, isIndexed } from '@/lib/cityPages';
import { articles } from '@/content/articles';

// Google ignores <changefreq> and <priority> (developers.google.com/search/
// docs/crawling-indexing/sitemaps/build-sitemap), so neither field is set
// here. <lastmod> is included only where the source data has a real content
// date; Google only trusts it when it is "consistently and verifiably
// accurate", so a build-time `new Date()` is never used.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes
    .filter((r) => !r.noindex)
    .map((r) => ({
      url: `${siteConfig.url}${r.path}`,
      ...(r.lastModified ? { lastModified: r.lastModified } : {}),
    }));

  const cityPages: MetadataRoute.Sitemap = allCityPages()
    .filter(({ product, city }) => isIndexed(product, city))
    .map(({ product, city }) => ({
      url: `${siteConfig.url}${cityPagePath(product, city.slug)}`,
      lastModified: CITY_PAGES_LAST_MODIFIED,
    }));
  const cityHubs: MetadataRoute.Sitemap = cities.filter(isHubIndexed).map((c) => ({
    url: `${siteConfig.url}${cityHubPath(c.slug)}`,
    lastModified: CITY_PAGES_LAST_MODIFIED,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteConfig.url}/learning-center/${a.slug}`,
    lastModified: a.updatedAt,
  }));

  return [...pages, ...cityHubs, ...cityPages, ...articlePages];
}
