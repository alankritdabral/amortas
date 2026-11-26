import Link from "next/link";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { company, contact } from "@/lib/config";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Grievance Redressal",
  description:
    "How to complain to Amortas about a loan enquiry, a lending partner or your data, what to include, how long we take and how to escalate to the RBI.",
  path: "/grievance-redressal",
});

// OWNER ACTION: fill company.grievanceOfficer in lib/config.ts. RBI's Digital
// Lending Directions expect a named grievance/nodal officer to be published.
// Confirm the timelines below match the real complaint-handling process.

export default function GrievanceRedressalPage() {
  const g = company.grievanceOfficer;
  const officerEmail = g.email || contact.email;
  return (
    <LegalPage
      path="/grievance-redressal"
      title="Grievance Redressal"
      intro="If something went wrong with your enquiry, a lending partner, or how your data was handled, tell us. This is how to reach us and what to expect."
    >
      <h2>What you can complain about</h2>
      <ul>
        <li>How your enquiry or eligibility check was handled</li>
        <li>Mis-selling or being given misleading information</li>
        <li>Charges or fees you were asked to pay</li>
        <li>Your data: consent, marketing calls or messages, access, correction or deletion</li>
        <li>A lending partner&apos;s conduct on an application that came through Amortas</li>
        <li>Technical problems on the website</li>
      </ul>

      <h2>Step 1: write to us</h2>
      <p>
        Email <a href={`mailto:${contact.email}`}>{contact.email}</a> or message us on WhatsApp ({contact.whatsapp}).
        Please include:
      </p>
      <ul>
        <li>your name and the mobile number you used with us;</li>
        <li>the date of your enquiry and what you asked for;</li>
        <li>what went wrong and what outcome you want;</li>
        <li>screenshots or messages, if you have them.</li>
      </ul>
      <p>We will acknowledge your complaint within 2 working days and aim to resolve it within 30 days.</p>

      <h2>Step 2: Grievance Officer</h2>
      <p>
        If you are not satisfied with the reply, or you hear nothing within 7 working days, write to our Grievance
        Officer{g.name ? `, ${g.name}${g.designation ? ` (${g.designation})` : ""}` : ""}, at{" "}
        <a href={`mailto:${officerEmail}`}>{officerEmail}</a>
        {g.phone ? <> or {g.phone}</> : null}. Put &quot;Escalation&quot; in the subject line and quote your earlier
        complaint.
      </p>

      <h2>Step 3: outside Amortas</h2>
      <ul>
        <li>
          <strong>Lender complaints:</strong> complaints about a lender&apos;s decisions or charges should also be
          raised with that lender. If the lender is an RBI-regulated entity and you do not get a satisfactory reply within
          30 days, you can complain through the RBI Complaint Management System at{" "}
          <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer">
            cms.rbi.org.in
          </a>
          .
        </li>
        <li>
          <strong>Data complaints:</strong> if we have not resolved a complaint about your personal data, you can
          complain to the Data Protection Board of India, as the DPDP Act, 2023 provides.
        </li>
        <li>
          <strong>Fraud:</strong> report it to the National Cyber Crime Reporting Portal (cybercrime.gov.in) or helpline
          1930.
        </li>
      </ul>

      <p>
        See also the <Link href="/privacy-policy">Privacy Policy</Link>,{" "}
        <Link href="/partner-disclosures">Partner disclosures</Link> and the{" "}
        <Link href="/delete-account">data deletion form</Link>.
      </p>
    </LegalPage>
  );
}
