// Centralised claims - keep configurable, never hardcode in components
export const claims = {
  personalLoanFrom: "9.99% p.a.*",
  personalLoanFromNote: "Personal loans starting from 9.99% p.a.* for eligible salaried applicants",
  balanceTransferNote: "Help customers reduce their interest burden, potentially to rates around 11% or lower where eligible.",
  disclaimerShort: "*Rates depend on credit profile, income, employer, existing obligations, loan amount, tenure and lender policy. For eligible applicants only.",
  disclaimerFull: "Your actual rate, EMI, savings and eligibility depend on your financial profile and the respective lender's criteria.",
  calculatorDisclaimer: "Illustrative / indicative only. This calculator output is not an approved offer.",
} as const;

export const contact = {
  whatsapp: "+91-9761471212",
  // Pre-filled text for the "Chat on WhatsApp" buttons. The employee numbers come from the
  // backend (lead_employees) via /whatsapp-chat.
  whatsappMessage: "Hi, I would like help with my loans.",
  email: "info@amortas.com",
  addresses: [
    {
      city: "Dehradun",
      fullAddress: "2nd floor, Jumpstart Haridwar Bypass Rd, opp. Nilaya Hills, Saraswati Vihar, Ajabpur Kalan, Dehradun, Uttarakhand 248001"
    },
    {
      city: "Delhi",
      fullAddress: "3rd floor 1/560A main GT road shahdra near jindal oil mills mansarovar park shahdara delhi-110032"
    },
    {
      city: "Rudrapur",
      fullAddress: "Balaji Dwar, Adarsh Colonial Road, Rudrapur, near SBI Bank ATM Rudrapur Uttarakhand 263153"
    }
  ],
  legalName: "Amortas",
} as const;

/**
 * Registered-entity and grievance-officer details shown on the legal pages,
 * footer and About page. EVERY field here is optional and is rendered only
 * when filled in, so nothing is invented. OWNER ACTION: fill these in from the
 * incorporation documents; the RBI Digital Lending Directions expect a named
 * grievance/nodal officer. Until then the pages fall back to the public
 * contact email.
 */
export const company = {
  legalEntityName: "",
  cin: "",
  registeredOffice: "",
  gstin: "",
  grievanceOfficer: {
    name: "",
    designation: "",
    email: "",
    phone: "",
  },
} as const;

/** Date the legal pages were last revised (shown to visitors). */
export const LEGAL_LAST_UPDATED = "26 November 2026";

export const lendingPartners = {
  enabled: true,
  headline: "Affiliated Banking & Lending Partners",
  subheadline: "We work with premier private sector banks and RBI-registered NBFC networks across India to find optimal loan and consolidation solutions.",
  partners: [
    { id: "hdfc", name: "HDFC Bank", type: "Private Bank" },
    { id: "icici", name: "ICICI Bank", type: "Private Bank" },
    { id: "axis", name: "Axis Bank", type: "Private Bank" },
    { id: "kotak", name: "Kotak Mahindra Bank", type: "Private Bank" },
    { id: "indusind", name: "IndusInd Bank", type: "Private Bank" },
    { id: "idfc", name: "IDFC FIRST Bank", type: "Private Bank" },
  ],
} as const;

export const siteConfig = {
  name: "Amortas",
  tagline: "Paying Too Much Interest on Your Loans? Let's Find a Better Way Forward.",
  // Must match the primary domain in Vercel (Project → Settings → Domains).
  // Vercel 308-redirects the apex (amortas.com) to www, so canonicals,
  // og:url, sitemap <loc> and the robots Sitemap: line must all use www.
  url: "https://www.amortas.com",
};
