# Plan 02: Get amortas.com indexed and ranking on Google

| | |
|---|---|
| Written | 2026-11-26 |
| Builds on | `plans/01-visibility-and-analytics.md` (analytics, consent, metadata budget, city-page decision D5). This plan doesn't repeat it. |
| Stack | Next.js 16.3.4 App Router on Vercel (`bom1`), DNS at GoDaddy, canonical host `https://www.amortas.com` |
| Owner actions | Steps marked **[Owner]** need a login (Search Console, GoDaddy, Vercel, Google Business Profile). Everything else is code. |

## The short version

The site is crawlable: robots.txt, sitemap, canonicals and `index, follow` are all correct. It doesn't show on Google for three reasons:

1. **Google hasn't been asked to index it yet, or hasn't got to it.** amortas.com is a new domain with almost no links pointing at it. A brand search for "amortas" or "amortas.com" returns nothing.
2. **The old domain's history is thrown away.** `creditexpertindia.com/` 301-redirects only the homepage. Every deeper old URL (`/debt-consolidation`, etc.) returns **404**, so whatever trust Google had in the old site goes nowhere.
3. **Loans are a "Your Money or Your Life" topic.** For loans, Google ranks sites it trusts: real company details, named authors, honest numbers, links from known sites. A new domain has to earn that, and it takes time.

Fixing 1 and 2 is a few hours of work and should get the pages **indexed within 1 to 3 weeks**. **Ranking** for competitive queries like "debt consolidation loan" against Tata Capital, Bajaj Finserv and Paisabazaar is a 4 to 9 month job (3 to 5 below), and long-tail and city queries come first.

---

## Where things stand (checked 2026-11-26)

| Check | Result |
|---|---|
| `https://www.amortas.com/robots.txt` | 200, allows everything except `/api/` and `/whatsapp-chat`, points to the sitemap |
| `https://www.amortas.com/sitemap.xml` | 200, 29 URLs, real `<lastmod>` dates |
| Homepage `<meta name="robots">` | `index, follow` |
| Canonicals | `https://www.amortas.com/...` on every page |
| Apex `amortas.com` | 308 to `www`, path preserved |
| Old `creditexpertindia.com/` | 301 to `amortas.com/` (then a second hop to `www`) |
| Old `creditexpertindia.com/<any path>` | **404**. This is the main thing to fix. |
| Search Console | 4 `google-site-verification` TXT records on amortas.com, so a property exists. Its Pages report hasn't been reviewed. |
| Search results | No amortas.com URL found for brand or topic searches |
| Content | 22 static pages, 1 indexed city page (Delhi; 12 templated city pages are `noindex`), 6 articles |

---

## Done in this change (2026-11-26)

- **robots.txt** (`app/robots.ts`): every major search engine and about 40 AI crawlers are named and explicitly allowed: OpenAI, Anthropic, Google-Extended, Perplexity, Apple, Meta, Amazon, xAI, Mistral, DeepSeek, ByteDance, Cohere, Common Crawl and others. It still points to `https://www.amortas.com/sitemap.xml`. `/whatsapp-chat`, a redirect with no content, is now disallowed.
- **sitemap.xml** (`app/sitemap.ts` + `lib/routes.ts`): still generated at the site root. Dates re-checked against git, and `/delete-account` added (the Play Store data-deletion policy needs it public).
- **Year keywords in titles**: 12 money pages and the homepage now carry the current year, for example "Personal Loan EMI Calculator 2026", "Debt Consolidation Loan in India 2026". The year comes from `SEO_YEAR` in `lib/seo.ts` (write `{year}` in a title or description). It rolls over to 2027 on the first deploy in January, so it never goes stale.
- **Visible "Updated" dates**: every page that uses `ProductHero` shows "Updated 26 November 2026" and emits matching `WebPage.dateModified` JSON-LD. Both come from the same `lastModified` in `lib/routes.ts` as the sitemap, so the three always agree.
- **Test**: `__tests__/seo-metadata.test.ts` now resolves template placeholders before measuring the homepage title, and checks the `{year}` token.

**Freshness rule. Read before touching dates:** move a page's `lastModified` in `lib/routes.ts` only when its content really changes. Google compares the visible date, the markup and the content. A date that moves without the content changing is treated as manipulation and ignored, and can cost trust.

---

## Progress log, 27 November 2026

| Item | Status |
|---|---|
| 1.1 Deploy | Done. Live. |
| 1.2 Search Console Domain property | Done. `sc-domain:amortas.com` verified (owner `admin@creditexpertindia.com`). |
| 1.3 Sitemap submitted | Done. Success, now 60 URLs (was 230, see below). |
| 1.4 Request indexing | Not needed. All 10 listed pages already show "URL is on Google". |
| 1.6 Old-domain redirects | Done. Vercel redirects `creditexpertindia.com` and `www` to `www.amortas.com` (301, path kept); GoDaddy forwarding removed, A `216.150.1.1`, CNAME `www` to Vercel. |
| 1.8 Change of Address | Done. Accepted 27 Nov 2026. |
| 1.9 Bing | Done. Signed in with Google, imported `amortas.com` (view-only), sitemap submitted (Processing). IndexNow sent 60 URLs (HTTP 202). |
| 1.10 Social profiles | Done. Owner confirmed (27 Nov 2026) all three profiles already show Amortas; the footer and `sameAs` links in `lib/structuredData.ts` point to them. |
| Trust details (Phase 5) | Legal entity, CIN, GSTIN and registered office published from the incorporation and GST documents. Grievance officer still blank (owner). |
| Delhi office address | Corrected to 2nd floor to match the GST certificate and ROC record. |

**Decision reversed (27 Nov 2026):** the 26 Nov decision to index every city page was reversed. With the city name masked the pages were 100% identical (about 1,500 words each, ~185 pages), which Google treats as thin or doorway content. Now only cities with an Amortas office are indexed. A non-office city becomes indexable only when it has real first-hand facts in `lib/cityFacts.ts` (see `docs/city-facts-template.md`); then its hub and personal-loan page are indexed.

**Email (separate from SEO):** `creditexpertindia.com` MX, SPF, DKIM and DMARC were brought in line with Google's recommendations. Verified mail still arrives.

**Still open, all owner input:** grievance officer details, first-hand facts for 3 to 5 cities, Google Business Profile address check, DMARC `p=quarantine` after about two weeks of reports.

## Phase 1: Get indexed (this week)

| # | Step | Who | Done when |
|---|---|---|---|
| 1.1 | Deploy this change. | Dev | Live robots.txt shows the AI list |
| 1.2 | Open Search Console. Confirm there is a **Domain property** for `amortas.com` (DNS-verified, so it covers `www` and apex). If only a URL-prefix property exists, add the Domain one; the TXT record is already in DNS. | **[Owner]** | Domain property visible |
| 1.3 | Search Console → Sitemaps → submit `https://www.amortas.com/sitemap.xml`. | **[Owner]** | Status "Success", 29 discovered |
| 1.4 | URL Inspection → **Request indexing** for these 10, one by one: `/`, `/debt-consolidation`, `/personal-loan`, `/loan-balance-transfer`, `/credit-card-debt`, `/personal-loan-emi-calculator`, `/calculators/debt-consolidation-calculator`, `/app-loan`, `/personal-loan-in-delhi`, `/learning-center`. | **[Owner]** | Each shows "URL is on Google" within about 1 to 2 weeks |
| 1.5 | Read Pages → "Why pages aren't indexed". Screenshot it and share it with dev. "Crawled – currently not indexed" means a quality or trust problem (Phases 3 and 4). "Discovered – not crawled" means too few links (Phase 5). | **[Owner]** | Reasons logged |
| 1.6 | **Fix the old domain so every path redirects.** In Vercel → Project → Domains, add `creditexpertindia.com` and `www.creditexpertindia.com`, both set to **Redirect to `www.amortas.com` (308)**. In GoDaddy, remove the forwarding and point the A record to Vercel (`76.76.21.21`) and `www` CNAME to `cname.vercel-dns.com`. Vercel domain redirects keep the path. | **[Owner]** + Dev | `curl -I https://www.creditexpertindia.com/debt-consolidation` returns 308 to `https://www.amortas.com/debt-consolidation` |
| 1.7 | If old URLs used different paths than the new site, add one-to-one redirects in `next.config.ts` `redirects()`. Get the old top URLs from the old Search Console property (Pages → Indexed) or the Wayback Machine. | Dev | No old URL with traffic returns 404 |
| 1.8 | Old-domain Search Console property → Settings → **Change of Address** → `amortas.com`. Needs 1.6 done first, since Google checks the redirects. | **[Owner]** | Change of Address accepted |
| 1.9 | Bing Webmaster Tools → import from Search Console. Bing powers Copilot and DuckDuckGo, and ChatGPT search relies on it. Then add **IndexNow** (a key file in `public/` and a ping on deploy), which covers Bing, Yandex, Naver and others, not Google. | **[Owner]** + Dev | Bing shows the sitemap |
| 1.10 | Rename the Facebook, Instagram and LinkedIn pages from "Credit Expert India" to **Amortas**, with a link to `https://www.amortas.com`. They are the `sameAs` links in `lib/structuredData.ts`. Google uses them to recognise the brand as an entity. | **[Owner]** | Profiles show Amortas and link to the site |

---

## Phase 2: Technical fixes (weeks 1 to 3)

1. **Every page reachable by a plain link.** Plan 01 found that the mega menu only renders on hover, so 16 pages had no link in the server HTML. Confirm the footer now links to every page in the sitemap (check with `curl -s https://www.amortas.com | grep -o 'href="/[^"]*"' | sort -u`).
2. **Internal links in body copy.** Each money page links to two or three related pages with descriptive anchor text ("compare a balance transfer", not "click here"). Each article links to its product page and calculator.
3. **Core Web Vitals on mobile.** The homepage ships three.js, gsap and d3-geo. Measure with PageSpeed Insights (mobile). Target: LCP < 2.5 s, INP < 200 ms, CLS < 0.1. Lazy-load the 3D map and animation libraries below the fold, or drop them on mobile.
4. **Structured data per page.** `FinancialProduct` or `LoanOrCredit` with a rate range on product pages (only figures `lib/lenderEngine.ts` supports), `HowTo` on how-it-works, `Article` with author on articles (already there; add `author.url`). Validate in the Rich Results Test.
5. **Images.** Descriptive file names and `alt` text (`personal-loan-salaried-couple.webp`, not `marraige.webp`).
6. **One H1 per page with the main keyword.** The hero H1s are conversational ("Need a personal loan? Let's see…"). Keep the voice, but put the keyword in an eyebrow above the H1 or in the first H2 ("Personal loans for salaried employees").
7. **404 page** links to the main sections. **Trailing-slash and case** variants should redirect, not duplicate.

---

## Phase 3: Keywords (and the year-tagged "future" keywords)

### How to use year keywords

- Titles carry `{year}`, so they always show the current year. This is done.
- **From 1 December**, borrowers start searching "**2027**" for plans ("best personal loan 2027", "how to get out of debt in 2027"). Publish two or three "2027" articles in early December so they're indexed by January (see the calendar below). Don't put 2027 in product page titles before January, because it would look wrong to anyone reading in December.
- Put the year where it's true: "Personal loan interest rates (November 2026)" only on a page with a dated rate table that someone actually reviews monthly.

### Keyword clusters → pages

Long-tail first: a new domain can't win head terms yet, but it can win specific questions.

| Cluster | Target queries (examples) | Page |
|---|---|---|
| Debt consolidation | debt consolidation loan india {year}, combine multiple loans into one, consolidate personal loans and credit card, debt consolidation for salaried | `/debt-consolidation`, calculator |
| Balance transfer | personal loan balance transfer {year}, balance transfer to lower interest, top-up with balance transfer, when to do a balance transfer | `/loan-balance-transfer`, article |
| Credit cards | credit card debt consolidation, convert credit card outstanding to personal loan, how to clear credit card debt fast | `/credit-card-debt` |
| App loans | how to close multiple loan apps, consolidate instant loan app EMIs, loan app harassment what to do | `/app-loan`, new articles |
| EMI calculators | personal loan EMI calculator {year}, EMI calculator with prepayment, EMI savings calculator | calculators |
| Eligibility | personal loan eligibility for salaried {year}, minimum salary for personal loan, personal loan with low CIBIL score | `/eligibility`, articles |
| Overdraft | overdraft vs personal loan, salary overdraft for salaried employees | `/personal-loan-overdraft` |
| Local | personal loan in Dehradun, debt consolidation Delhi, personal loan Rudrapur | office pages (Phase 6) |

### Forward-looking topics people will search next

Check each fact against the RBI, CIBIL or lender sources before publishing. These are topics, not claims.

- How RBI repo-rate changes affect existing floating and fixed personal loans (after each RBI monetary policy meeting)
- Credit score now updates every 15 days: what it means for loan applications (RBI rule effective 2025)
- RBI Digital Lending Directions: how to check that a loan app is legitimate
- DPDP Act: what loan companies can and can't do with your data (core duties expected from 2027)
- Year-end and festive-season debt: clearing Diwali and credit card spending before the new year
- New tax year (April): EMI planning and loans vs tax-saving investments

---

## Phase 4: Content calendar (12 weeks)

One useful article per week, about 1,200 to 2,000 words. Each has a worked rupee example, a named author or reviewer, sources, and links to one product page and one calculator. Add each to `content/articles.ts`; the sitemap picks it up automatically.

| Week of | Article | Cluster |
|---|---|---|
| 1 Dec | How to get out of debt in 2027: a month-by-month plan for salaried borrowers | Debt consolidation |
| 8 Dec | Best time to do a personal loan balance transfer (and when it isn't worth it) | Balance transfer |
| 15 Dec | Too many loan apps? How to close them and replace them with one EMI | App loans |
| 22 Dec | Credit card dues after the festive season: three ways to clear them before the interest compounds | Credit cards |
| 29 Dec | Personal loan eligibility in 2027: salary, CIBIL score and employer category explained | Eligibility |
| 5 Jan | What your CIBIL score needs to be for a lower personal loan rate | Eligibility |
| 12 Jan | Debt consolidation vs debt settlement: why settlement hurts your credit | Debt consolidation |
| 19 Jan | Foreclosure and part-prepayment charges: what you pay to close a loan early | Balance transfer |
| 26 Jan | How to read your credit report: every section explained | Eligibility |
| 2 Feb | After the RBI policy: what a repo-rate change means for your EMI | Forward-looking |
| 9 Feb | Overdraft or personal loan: which costs less for a short-term need | Overdraft |
| 16 Feb | Is a debt consolidation loan bad for your credit score? | Debt consolidation |

**Refresh cycle:** each month, update the two or three articles with the most Search Console impressions with new data or examples, then bump their `updatedAt`. That is real freshness, and Google rewards it.

---

## Phase 5: Trust (E-E-A-T). This matters most for a loan site.

Google's quality raters judge loan sites strictly. Each of these is a ranking input:

1. **About page with real people**: founders and team with photos, LinkedIn links and years in lending. Company legal name, CIN or registration, GST, registered office.
2. **Author and reviewer on every article**: "Written by … · Reviewed by … (role)", each with a bio page.
3. **Regulatory clarity**: state clearly what Amortas is (DSA, LSP or referral partner), list the lenders it works with (matching `lib/lenderEngine.ts`), and name a grievance officer with an RBI ombudsman route. See plan 01, D7.
4. **Only claims you can back up**: plan 01, D8. Remove or prove "50+ lenders" (the data has 13), user-count badges, ratings and any placeholder testimonials. One unsupported number can sink trust for the whole domain.
5. **Real reviews**: collect Google reviews on the Business Profile (Phase 6), and add them to the site with permission.
6. **Contact visible everywhere**: phone, email and the three office addresses in the footer (already partly done).

---

## Phase 6: Local SEO (weeks 2 to 6)

The fastest wins for a new domain are local "near me" and city searches, because you have real offices.

1. **[Owner]** Create **Google Business Profiles** for Dehradun, Delhi (Shahdara) and Rudrapur: category "Loan agency" or "Financial consultant", hours, photos, link to the matching office page. Verify each by postcard or video.
2. Build **real office pages**: `/office/dehradun`, `/office/delhi`, `/office/rudrapur`, each with address, map embed, team, directions, local FAQs and `LocalBusiness` JSON-LD. Same name, address and phone as the Business Profile.
3. List on Justdial, Sulekha, IndiaMart and Bing Places with identical name, address and phone.
4. Rewrite city pages one at a time with real local content before removing `noindex` (plan 01, D5). Dehradun, Delhi and Rudrapur come first because you have offices there.

---

## Phase 7: Authority and links (ongoing from week 3)

A new domain needs other sites pointing at it. Without links, even perfect pages sit on page 5.

- **Lender partner pages**: under RBI digital-lending rules, lenders list their LSPs and DSAs. Ask each partner to link to amortas.com from that page. These are the highest-trust links available.
- **Free calculator embeds**: offer the EMI and consolidation calculators as embeddable widgets with a credit link, for finance bloggers.
- **Data PR**: publish anonymised findings from your own lead data, for example "Average salaried borrower in Uttarakhand has 3.4 active loans". Pitch them to Indian personal-finance journalists (Moneycontrol, ET Wealth, Mint, Business Standard) and regional press (Amar Ujala, Dainik Jagran for Uttarakhand).
- **Expert quotes**: register on journalist-request services and answer loan or credit questions.
- **Startup and business directories**: Startup India, Uttarakhand startup directory, Crunchbase, LinkedIn company page, Tracxn.
- **YouTube**: short Hindi and English explainers on each article topic, linked back to the site.
- **Avoid**: paid link packages, PBNs and comment spam. They get loan sites penalised.

---

## Phase 8: AI search (ChatGPT, Gemini, Perplexity, Copilot)

robots.txt now allows the AI crawlers. To get cited:

1. Start each article with a 2 to 3 sentence direct answer, then the detail. AI answers lift these.
2. Use clear question H2s ("How much can I save with a balance transfer?") and tables of numbers.
3. Keep facts consistent everywhere (name, offices, lenders, rate range), because AI systems cross-check.
4. Optional: add `public/llms.txt` listing the key pages with one-line summaries. It's cheap, and no ranking effect is proven.
5. Bing indexing (1.9) matters here, because ChatGPT search and Copilot draw on Bing's index.

---

## Measurement

| Metric | Where | Target |
|---|---|---|
| Indexed pages | Search Console → Pages | 29 of 29 by week 3 |
| Brand search "amortas" | Google | #1 by week 4 |
| Impressions | Search Console → Performance | Rising week on week from week 2 |
| Non-brand clicks | Search Console, query filter excluding "amortas" | First 100 per month by month 3 |
| Top-10 keywords | Search Console average position < 10 | 20 long-tail by month 4 |
| Leads from organic | GA4 (plan 01 attribution) | Tracked from month 1 |
| Referring domains | Search Console → Links | 25+ by month 4 |

Review Search Console weekly for the first 8 weeks, then monthly.

## Timeline at a glance

| When | Expect |
|---|---|
| Week 1 | Deploy, sitemap submitted, indexing requested, old-domain redirects fixed |
| Weeks 2 to 3 | Pages indexed, brand search shows the site |
| Months 1 to 2 | Impressions for long-tail and local queries, Business Profile calls |
| Months 3 to 6 | Page 1 for long-tail and calculator queries as links and content build |
| Months 6 to 12 | Competing on mid-volume terms ("debt consolidation loan india") |

## Decisions for the owner

| # | Decision | Default |
|---|---|---|
| S1 | Who manages GoDaddy DNS for creditexpertindia.com, so step 1.6 can happen | Owner to confirm this week |
| S2 | Named author and reviewer for articles | Founder as reviewer, writer named per article |
| S3 | Can anonymised lead statistics be published for PR? | Yes, aggregated only, no personal data |
| S4 | Budget for writing (one article a week) and outreach | One writer, part-time |
