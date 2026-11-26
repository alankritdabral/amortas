import Link from "next/link";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { claims } from "@/lib/config";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description:
    "Amortas is a loan facilitator, not a bank or NBFC. Rates and results are indicative, approval is the lender's decision, and we never charge to release a loan.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage path="/disclaimer" title="Disclaimer">
      <h2>We are a facilitator, not a lender</h2>
      <p>
        Amortas is not a bank, NBFC or lender. We help you compare options and, with your permission, pass your enquiry to
        partner lenders. Final approval, loan amount, interest rate, fees and tenure are decided by the lender. See{" "}
        <Link href="/partner-disclosures">Partner disclosures</Link>.
      </p>

      <h2>Rates and results are indicative</h2>
      <p>{claims.disclaimerShort}</p>
      <p>
        {claims.disclaimerFull} {claims.calculatorDisclaimer} Read the lender&apos;s Key Fact Statement and loan agreement
        before accepting any offer.
      </p>

      <h2>Information accuracy</h2>
      <p>
        We work to keep the information on this website accurate and current, but lender policies and rates change often
        and we cannot guarantee that every detail is complete or up to date. The website is general information, not
        financial, legal or tax advice.
      </p>

      <h2>Third-party links</h2>
      <p>
        We link to lenders, credit bureaus and other sites. We do not control them and are not responsible for their
        content or practices.
      </p>

      <h2>Fraud alert</h2>
      <p>
        Amortas and its representatives never ask you to pay money to approve, release or process a loan, and never ask
        for your OTP, PIN or card details over phone, WhatsApp or SMS. If someone asks for these in our name, do not pay
        or share anything, and report it to us through <Link href="/contact">Contact</Link> and to the National Cyber
        Crime Reporting Portal (cybercrime.gov.in) or helpline 1930.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        Our liability is limited as set out in the <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.
      </p>
    </LegalPage>
  );
}
