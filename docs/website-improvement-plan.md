# Amortas website improvement plan

Date: 2026-11-26
Basis: code audit of this repo plus a read of loansjagat.com (22 URLs fetched).

Limits of the competitor read: LoansJagat's privacy policy and terms pages returned only their titles, so their structure could not be compared. Meta tags and schema were not visible either. Every legal rewrite below needs review by counsel before it ships.

---

## 1. Where we stand vs LoansJagat

| Area | LoansJagat | Amortas (us) |
|---|---|---|
| Indexable pages | ~128 organic pages + thousands of blog/news URLs | ~28 in sitemap (21 static, 1 city, 6 articles) |
| City pages | 41 personal-loan, 15 business-loan, 3 debt-consolidation | 13 built, only Delhi indexed |
| Product depth | amount pages (1-50 lakh), segment pages (women, doctors, pensioners), 7 bank pages | 9 thin product pages (~300-500 words each) |
| Blog | ~255 pages of posts, bylined authors | 6 articles, ~1,200 words total, no authors |
| Legal pages | Privacy, T&C, Disclaimer, Cookie, Refund, Grievance (3-level, named person) | Privacy (~330 words), T&C (~200 words), Partner disclosures (has the only grievance section) |
| Company identity | Names "AF Financial Technology Pvt Ltd" in refund policy and about | No legal entity, CIN, registered office or GST anywhere |
| Calculators | EMI, business EMI, home-loan eligibility | 3 calculators, with a strong debt-consolidation one |

Our real advantages: the lender-engine eligibility check, the debt-consolidation calculator, and a cleaner trust posture (we removed fake ratings and testimonials). LoansJagat's own pages contradict each other (see section 8), so copying their numbers or claims would be a mistake.

---

## 2. Priority 0: compliance and legal (do first)

### 2.1 Privacy policy rewrite (`app/privacy-policy/page.tsx`)
Current state: ~330 words of boilerplate. The code comment at lines 43-46 says it has not been reviewed by counsel.

Rewrite to cover, in this order:
1. Who we are: legal entity name, registered address, contact, and a named grievance officer (see 2.3).
2. Data we collect, listed against what the code actually collects:
   - Contact: name, mobile, email, city.
   - Financial: employment type, income, employer, salary mode, ongoing EMIs.
   - Identity: PAN, date of birth, gender.
   - Credit bureau report (Experian / CIBIL / CRIF) and the raw bureau data we store.
   - OTP verification records, device and attribution data, click events, system logs.
3. Purpose of each category (purpose limitation), tied to the three separate consents in 2.2.
4. Who we share with: partner lenders (link to /partner-disclosures), bureaus, and processors (OTP providers MessageBot/MSG91, IDSPay, Vercel, Firebase, Google Tag Manager, Meta, Microsoft Clarity). Name them.
5. Cookies and trackers, including Meta Pixel and the hashed phone number sent on enquiry (stated in `content/consent.ts` but missing from the policy).
6. Retention periods per category. Align with /delete-account (currently 90 days).
7. User rights under the Digital Personal Data Protection Act 2023: access, correction, erasure, withdraw consent, nominate, grievance. Say how to exercise each and the response time.
8. Security measures, breach notification, children and minors (21+ only per the form), cross-border transfers (Vercel, Firebase), policy changes.
9. A visible "Last updated" date and version.

Also fix the claim that analytics run only after the user accepts the banner. That is currently untrue (see 2.4).

### 2.2 Split the bundled consent
- `components/EligibilityForm.tsx:709-720`: one checkbox sets `consent`, `consentContact` and `consentShareWithLenders` together. Replace with separate, unticked checkboxes: (a) retrieve my credit report, (b) contact me, (c) share with partner lenders. Each gets a plain-language purpose, a link to the privacy policy, and a note that consent can be withdrawn.
- `components/ContactForm.tsx:338-353`: add a privacy-policy link and a purpose line.
- Remove or correct the line "Your information is secure and never shared without consent" (`EligibilityForm.tsx:787`) once sharing is described properly.
- The eligibility bureau pull is a hard enquiry in practice. The FAQ line "we start with a soft profile review; a hard enquiry only happens if you choose to apply" (`lib/pageContent.ts:49-54`) must match what the flow does. Verify with whoever owns the bureau integration.

### 2.3 Grievance redressal page and named officer
- Create `/grievance-redressal` (spell it correctly; LoansJagat's slug is "redressel").
- Content: principles, categories (application, mis-selling, charges, data privacy/consent, technical, KYC), a 3-level escalation ladder with emails and day limits, acknowledgement and resolution timelines, hours, what to include in a complaint, RBI CMS portal reference (`cms.rbi.org.in`).
- Name a grievance/nodal officer with a direct email. The TODO at `app/partner-disclosures/page.tsx:46-54` says the RBI Digital Lending Directions 2025 expect this. This needs a business decision on who the person is.
- Link it from the footer legal row, privacy policy, partner disclosures and contact page. Move the existing "Grievance Redressal" section out of partner-disclosures into the new page and leave a link.

### 2.4 Cookie consent and tracking
- `app/layout.tsx`: `ConsentBanner` is commented out ("TEMP: cookie banner disabled"), while GTM and Meta Pixel (`fbq('init','1194449116344351')`) load unconditionally. Clarity is gated, but nothing can grant consent.
- Either re-enable the banner and gate Pixel and GTM behind consent, or remove the claim from the policy. Re-enabling is the correct fix.
- The footer "Cookie settings" button calls `clearConsent()` but has no banner to re-prompt. It works again once the banner is back.
- Add a `/cookie-policy` page listing each cookie/tool, its purpose, and duration. LoansJagat's cookie page names none, so listing ours would be better.

### 2.5 Company identity
- Add legal entity name, CIN, registered office and GST to: footer, /about, /contact, terms, privacy policy, partner disclosures. `lib/config.ts:31` currently has only "Amortas". Needs the real details from the business.
- State plainly what Amortas is: a loan facilitator or a lending service provider under RBI rules. The two have different disclosure duties. Confirm with counsel which applies, then make the wording match everywhere.
- Align `lib/config.ts:36` (`lendingPartners` lists IDFC FIRST) with the 13 lenders in `lib/lenderEngine.ts`, or confirm it is unused.

### 2.6 Delete-account flow
- `app/delete-account/DeleteAccountForm.tsx:57-62` is not wired to a backend, so requests are lost. This is the most urgent functional bug in the list.
- Add an API route, an OTP check on the phone number (the page promises verification), a confirmation message with a reference number, an email fallback, and a response SLA.
- Link the page from the footer and privacy policy. Decide whether it should be indexed (Play Store data-deletion URLs usually need to be public).
- Fix wording: the page refers to an "Amortas app" and an "account", but the site has no login.

### 2.7 Terms and conditions rewrite (`app/terms-and-conditions/page.tsx`)
Current: ~200 words, headings "Cookies", "License", "Disclaimer", grammar errors. Add: company details, services description, eligibility (21+, Indian resident), accuracy of information, credit-report terms (bureau pull, validity), fees and how we are compensated (link to partner disclosures), no guarantee of approval, third-party links, limitation of liability, intellectual property, termination, governing law and jurisdiction, dispute resolution, changes, contact. Fix the page title and meta description; neither matches the content.

### 2.8 New short legal pages
- `/disclaimer`: information accuracy, rates indicative, fraud alert (we never ask for payment to disburse a loan), third-party links.
- `/refund-policy`: only if we ever charge a fee. If everything is free, say so in one line on the terms page and skip this page.

### 2.9 Partner disclosures (`app/partner-disclosures/page.tsx`)
Add: date, per-lender RBI registration type and number, link to each lender's own product terms, cooling-off and Key Fact Statement note, LSP/DLA declaration if applicable. Keep the "no guarantee" and "how we are compensated" sections.

### 2.10 Data hygiene in the repo
- `reports/` holds bureau JSON and a PDF that look like real credit-report data. Confirm it is test data. If it is real, remove it from git history and add it to `.gitignore`.
- `/api/credit-report/save` stores raw PAN, DOB and bureau JSON. Confirm encryption at rest and access controls, and cover it in the privacy policy.

---

## 3. Priority 1: content and trust claims

### 3.1 Claims to verify or soften
| Claim | Where | Action |
|---|---|---|
| "13 RBI-regulated lenders", "13 partner banks and NBFCs" | `lib/pageContent.ts:27-31`, calculator page:374, partner-disclosures:27 | Keep only if signed agreements exist. Otherwise "lenders we compare". |
| "from 9.99% p.a.*" | layout, hero, city pages, navbar | Keep the footnote. State the lender and the profile that gets this rate. |
| "Usually within 24 hours" | `app/contact/page.tsx:35` | Confirm real response time. |
| "Every enquiry is handled by a credit specialist, not a chatbot" | `lib/pageContent.ts`, about | Confirm. |
| "Initial credit advisory 100% free" | `content/site.ts:204` | File looks unused. Confirm and delete. |
| "Offices in 3 cities" | about | Fine, three addresses are on /contact. |

The earlier note in memory about a live "50+ lenders" claim: the code audit found no such text. Only "13" appears. Search the deployed site and any CMS or metadata outside the repo before closing this.

### 3.2 Delete dead fake content
- `content/site.ts:208-230`: fabricated testimonials ("Rahul S., Software Engineer, Bengaluru", 5 stars, 10.5%).
- `lib/pageContent.ts:36`: placeholder testimonials, imported but not rendered.
- `components/hero/utils.ts:35-50`: fake "Approved / Consolidated / Cleared" ticker with rupee amounts.
- If testimonials return later, use real, consented ones with name or initials, city, and a verifiable date.

### 3.3 About page (`app/about/page.tsx`)
Currently ~300-400 words. Add: company story and why we exist, how the lender engine works in plain language, how we make money, legal entity block, leadership names and photos (only with their consent), office addresses, link to grievance and privacy. No unverifiable numbers.

### 3.4 Product pages (9 pages, ~300-500 words each)
For each of `/personal-loan`, `/debt-consolidation`, `/loan-balance-transfer`, `/high-interest-loan`, `/credit-card-debt`, `/app-loan`, `/personal-loan-overdraft`, `/eligibility`, `/how-it-works`, expand to 900-1,500 words:
- A comparison-style rate and fee table with ranges, tenure, processing fee, prepayment rules. Label them indicative and name the source (lender engine data).
- Eligibility criteria and documents list.
- A worked example with real EMI math (we already have the calculators).
- Who it suits and who it does not.
- 6-8 FAQs unique to the product, not shared `commonFaq`.
- Internal links to the relevant calculator and article.
- `/loan-balance-transfer` is titled "Personal Loan Balance Transfer Calculator" but is a content page. Retitle it.
- Add `FinancialProduct`/`LoanOrCredit` JSON-LD only with figures we can stand behind.

### 3.5 FAQ page (`content/faq.ts`, ~307 words)
Grow to 30+ questions, grouped: eligibility, credit report and score, fees, data and privacy, process, debt consolidation, after-application. Keep the FAQPage schema even though Google removed the rich result on 7 May 2026, because it still helps parsing.

### 3.6 Learning center
- 6 articles at 145-327 words are too short for finance content. Target 1,000-1,800 words each.
- Add author and reviewer bylines with credentials, a sources list, and a visible "last reviewed" date. All six currently carry the same date (2026-11-02).
- Topic backlog (about 20 articles to start): credit score ranges and how to improve, CIBIL vs Experian vs CRIF, how debt consolidation affects your score, personal loan documents list, how to read a loan offer / KFS, foreclosure and prepayment charges, balance transfer checklist, avoiding loan app scams, EMI-to-income ratio, credit card minimum due trap, loan for specific purposes (wedding, medical, home improvement), salary-slip vs bank-statement loans, glossary.
- Add category pages and a search box once there are 20+ posts. Avoid thin tag archives; LoansJagat has about 90 category slugs, many sparse.

### 3.7 Calculators
- Keep the three. Add a plain-text explanation of the formula and a worked example under each, since they have little prose.
- Add: loan eligibility calculator (feeds the lender engine), foreclosure savings calculator.
- Unify EMI examples across pages so the numbers agree.

---

## 4. Priority 2: SEO and structure

### 4.1 City pages
- Current: 13 pages from one template, 12 are `noindex`, only Delhi is in the sitemap. Delhi's "other cities" list renders empty because `CityLoanPage.tsx:14` filters out noindex cities, and the "Personal Loans by City" breadcrumb points to `/personal-loan`.
- The Navbar "Cities" menu links to 12 noindex pages, which wastes crawl budget and looks inconsistent.
- Decision needed. Option A (recommended): keep noindex until each page has unique content, then index in batches. Option B: delete the doorway pages. Do not index them as they are.
- Unique content per city: local cost-of-living and average income context, which employers and sectors are common, which of our lenders serve it, city-specific FAQs, a real local office only if one exists (only Delhi has an address, plus Dehradun and Rudrapur, which have no city page). Aim for 700+ words that are not a find-and-replace.
- Build `/personal-loan-in-cities` as a real index and point the breadcrumb at it.
- Fix the Navbar to link only to indexed cities.

### 4.2 New page types worth building (in order)
1. Loan amount pages, e.g. `/personal-loan-5-lakh`, `/personal-loan-10-lakh` (LoansJagat has 14). Each with a real EMI table across tenures.
2. Segment pages: salaried, self-employed, doctors, government employees, pensioners, women. Only where our lenders actually serve the segment.
3. Lender pages: one per lender in `LENDERS`, with factual rate, fee and eligibility ranges and a clear note that Amortas is not that bank. Only publish what the engine data supports.
4. `/debt-consolidation-in-{city}` for the top 3 cities, since debt consolidation is our differentiator and LoansJagat has only 3 of these.
5. Business loan pages, only if that is a product we plan to offer.

### 4.3 Technical SEO fixes
- `app/page.tsx:15-17`: the home page sets only a canonical. Add its own title and description.
- Sitemap: add `priority`/`changeFrequency` is optional. More important is adding `/grievance-redressal`, `/cookie-policy`, `/disclaimer` and each new page type, and updating `lastModified` when content changes.
- JSON-LD on `/contact` uses plain `JSON.stringify` (`app/contact/page.tsx:17-34`). Switch to the `jsonLd()` escaper used elsewhere.
- Add `BreadcrumbList` to every product page, not only city, article and disclosure pages.
- Check `PageFAQ` actually emits `pageFaqSchema`.
- Fix the Facebook link in the footer, which ends in `/#`.
- Verify `#credit-profile` exists on `/eligibility`.
- `robots.ts` already allows AI crawlers. Keep as is if that is intended.
- Add `noindex` to `/delete-account` only if we do not need it public.
- Make titles unique and under about 60 characters. LoansJagat has several titles with no brand suffix, which is an easy gap for us to avoid.

### 4.4 Navigation and footer
- Footer legal row to include: Privacy, Terms, Disclaimer, Cookie policy, Grievance, Partner disclosures, Delete account, Cookie settings.
- Add the legal entity line and CIN under the offices block.
- Navbar "Resources" is long. Group legal pages into the footer only.
- Add a visible sitemap page (HTML), as LoansJagat has, once the page count grows.

---

## 5. Priority 3: product and conversion

- Contact form: add a consent link, query-type dropdown, and a visible expected response time.
- Careers: LoansJagat only offers an email address. A short `/careers` page with open roles or a "send your CV" section is a small win if we are hiring.
- Media/testimonials: do not add "As featured in" logos or review counts unless they are real and linkable.
- Add a visible fraud and scam notice (we have `ScamProtection` on the home page). Repeat a short version on the eligibility and contact pages.
- Show a one-line "How we are paid" under every lead form, linked to partner disclosures.

---

## 6. Code cleanup (separate small PR)

Unused files, about 10k lines of dead code: `components/LoanStage.tsx`, `NetworkStats.tsx`, `HeroGridBlock.tsx`, `AnimatedWord.tsx`, `hero/HeroVisualBlock.tsx`, `hero/IndiaMapScene.tsx`, `hero/LoanNotificationManager.tsx`, `hero/LoanNotification.tsx`, `ui/Reveal.tsx`, `ui/AnimatedPhoneMockup.tsx`, `home/BeforeAfterHero.tsx`, the unused `HowItWorks` export in `LazyHomeSections.tsx`, and most of `content/site.ts`. Confirm each with a grep before deleting. Keep `ConsentBanner.tsx`; it comes back in 2.4.

---

## 7. Suggested order of work

| Phase | Items | Notes |
|---|---|---|
| 1 (this week) | 2.6 delete-account backend, 2.4 consent banner, 2.10 data check, 3.2 delete fake content | Functional and legal-risk bugs |
| 2 | 2.1 privacy policy, 2.2 consent split, 2.3 grievance page, 2.5 company identity, 2.7 terms | Needs counsel and business inputs (entity details, officer name) |
| 3 | 2.8-2.9 disclaimer and partner disclosures, 3.1 claim review, 3.3 about page, footer and nav changes | |
| 4 | 3.4 product pages, 3.5 FAQ, 4.3 technical SEO | Content-heavy |
| 5 | 3.6 articles, 4.1 city pages with real content, 4.2 amount and lender pages | Ongoing, roughly 4-6 pages per week |
| 6 | 6 code cleanup, 3.7 extra calculators | |

## 8. LoansJagat inconsistencies to avoid copying

- "₹0 fees" on the homepage vs "processing fee up to 3%" and "up to ₹6,500 + GST" on product pages.
- "50+" vs "40+" partner banks on different pages; "50 Lacs+" vs "10 Lacs+" customers.
- "We do not sell loans directly" vs "2000 Cr+ loans disbursed".
- "Data never shared with third parties" next to consent for CRIF, lenders and WhatsApp contact.
- The Delhi page mentions Noida; the loan-against-property page is a personal-loan template.
- Typos: "Condtions" in the T&C title, "redressel" in the grievance URL.

## 9. Inputs needed from you
1. Legal entity name, CIN, registered office, GST.
2. Whether Amortas is a facilitator or an RBI lending service provider (counsel).
3. Name and email of the grievance officer.
4. Whether signed lender agreements back the "13 lenders" claim.
5. Whether `reports/` contains real customer data.
6. City pages: keep and enrich, or delete.
7. Whether a business-loan product is planned.

---

## 10. Implementation status (2026-11-26)

Done (type-check, 111 tests and `next build` pass; nothing committed, not yet viewed in a browser):
- 2.1 Privacy policy rewritten; 2.7 Terms rewritten; 2.8 `/disclaimer`; 2.4 `/cookie-policy`; 2.3 `/grievance-redressal`; 2.9 partner disclosures updated.
- 2.4 Consent banner re-enabled. GTM loads only after analytics consent and Meta Pixel only after marketing consent (`components/analytics/TrackingLoader.tsx`).
- 2.2 EligibilityForm consent split into credit report (required), contact (required), lender sharing (optional). ContactForm links to the privacy policy.
- 2.6 Delete-account form posts to new `/api/delete-request`, stored via the backend as source `delete-account-request`. Copy fixed. OTP verification not added: we confirm by contacting the user.
- 2.5 `company` fields in `lib/config.ts` (empty), rendered on legal pages, About and footer only once filled.
- 3.2 Fake testimonials removed; dead hero and animation components deleted (~10k lines).
- 3.1 Misleading claims reworded in `lib/pageContent.ts`; footer links added; navbar Cities menu limited to indexed pages.
- 3.3 About page expanded; 3.5 FAQ grown from 7 to 23 questions; 3.6 six articles extended and six new ones added (12 total); contact JSON-LD now escaped.

Still open:
- Fill `company` and `grievanceOfficer` in `lib/config.ts` (needs your details), then counsel review of the legal pages.
- Product pages (3.4), city pages (4.1), amount/lender/segment pages (4.2): need decisions and verifiable facts.
- `reports/` data check (2.10), and confirming that the backend does not treat `delete-account-request` records as sales leads.
