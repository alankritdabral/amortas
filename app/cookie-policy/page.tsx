import Link from "next/link";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "Which cookies and trackers Amortas uses, what each is for, which need your consent, and how to change your choice at any time.",
  path: "/cookie-policy",
});

const rows: { name: string; provider: string; purpose: string; consent: string; keep: string }[] = [
  {
    name: "Consent choice (local storage)",
    provider: "Amortas",
    purpose: "Remembers what you accepted in the cookie banner.",
    consent: "Not needed (strictly necessary)",
    keep: "Until you change it or clear browser data",
  },
  {
    name: "Google Analytics",
    provider: "Google",
    purpose: "Counts page views and how people move through the site. Runs in a restricted, cookie-less mode until you accept.",
    consent: "Analytics",
    keep: "Up to 14 months",
  },
  {
    name: "Google Tag Manager",
    provider: "Google",
    purpose: "Loads our measurement tags. Not loaded until you accept analytics.",
    consent: "Analytics",
    keep: "Per the tags it loads",
  },
  {
    name: "Microsoft Clarity",
    provider: "Microsoft",
    purpose: "Anonymised session recordings and heatmaps. Form fields are blanked.",
    consent: "Recordings",
    keep: "30 days",
  },
  {
    name: "Meta Pixel",
    provider: "Meta",
    purpose: "Measures which Facebook and Instagram ads led to an enquiry. A hashed phone number is shared if you submit an enquiry.",
    consent: "Ad measurement",
    keep: "Per Meta's policy",
  },
  {
    name: "Vercel Analytics and Web Vitals",
    provider: "Vercel / Amortas",
    purpose: "Page speed and aggregated traffic counts, with no advertising identifiers.",
    consent: "Not needed (aggregate performance data)",
    keep: "Aggregated",
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      path="/cookie-policy"
      title="Cookie Policy"
      intro="Cookies and similar technologies are small pieces of data stored in your browser. This page lists the ones used on amortas.com."
    >
      <h2>What we use</h2>
      <div className="not-prose">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Needs consent</th>
              <th>Kept</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td>{r.provider}</td>
                <td>{r.purpose}</td>
                <td>{r.consent}</td>
                <td>{r.keep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Your choices</h2>
      <p>
        The banner on your first visit lets you accept all, reject all, or choose each category. Optional tools do not
        load until you accept them. Change or withdraw your choice at any time with &quot;Cookie settings&quot; in the
        footer. You can also block or delete cookies in your browser settings, though parts of the site may then not work
        as expected.
      </p>

      <h2>More information</h2>
      <p>
        How we handle personal data is explained in the <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
