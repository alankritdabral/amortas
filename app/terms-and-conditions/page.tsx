import Link from "next/link";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalPage, grievanceEmail } from "@/components/legal/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "The terms for using the Amortas website and loan advisory service: eligibility, credit-report consent, no guarantee of approval, liability and governing law.",
  path: "/terms-and-conditions",
});

// NOTE: not yet reviewed by legal counsel. Confirm governing-law city and
// jurisdiction with counsel before treating as final.

export default function TermsAndConditionsPage() {
  const email = grievanceEmail();
  return (
    <LegalPage
      path="/terms-and-conditions"
      title="Terms & Conditions"
      intro="These terms apply when you use amortas.com and our loan advisory service. By using the website you agree to them. If you do not agree, please do not use the website."
    >
      <h2>1. What Amortas does</h2>
      <p>
        Amortas is a loan facilitator. We help you check your eligibility, compare loan and debt-consolidation options,
        and, if you allow it, pass your enquiry to partner lenders. We are not a bank or NBFC, we do not lend money and
        we do not decide whether a loan is approved. See <Link href="/partner-disclosures">Partner disclosures</Link>{" "}
        for the lenders we work with and how we are paid.
      </p>

      <h2>2. Who can use the service</h2>
      <p>
        You must be an Indian resident, at least 21 years old and legally able to enter a contract. You must only submit
        information about yourself.
      </p>

      <h2>3. Information you give us</h2>
      <p>
        You agree that the information you provide, including your name, mobile number, income, employer, PAN and date of
        birth, is true, complete and your own. Wrong information can lead to wrong results or to a lender declining your
        application. We may ask you to verify your mobile number with a one-time password.
      </p>

      <h2>4. Credit reports</h2>
      <p>
        If you tick the permission to retrieve your credit report, you authorise us to request it from the credit
        information company you select (Experian, CIBIL or CRIF High Mark) and to use it to show your eligibility and to
        support your enquiry. The report reflects the bureau&apos;s data on the day it is fetched. Errors in a report
        must be taken up with the bureau. How we handle the data is in our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>5. Estimates, calculators and eligibility results</h2>
      <p>
        Calculator outputs, rates shown with an asterisk, and eligibility results are illustrative. They are not an offer
        or sanction. Final approval, loan amount, interest rate, fees and tenure are decided only by the lender after its
        own assessment. We do not guarantee approval or any particular rate. Read the lender&apos;s terms and Key Fact
        Statement before you accept any loan.
      </p>

      <h2>6. Fees</h2>
      <p>
        Using Amortas does not cost you anything. We may be paid by lenders when an enquiry results in a loan; this does
        not change the rate or fees the lender offers you. A lender may charge you its own processing and other fees.
        Never pay anyone claiming to be from Amortas to &quot;release&quot; or &quot;approve&quot; a loan. We do not ask
        for such payments.
      </p>

      <h2>7. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>submit false, misleading or someone else&apos;s information;</li>
        <li>attempt to access our systems or other users&apos; data without permission;</li>
        <li>scrape, copy or resell the website content or lender data at scale;</li>
        <li>use the website for anything unlawful.</li>
      </ul>

      <h2>8. Intellectual property</h2>
      <p>
        Unless stated otherwise, Amortas and its licensors own the content, design and software of this website. You may
        view it for your own personal use. You may not copy, republish or sell it without our written permission.
      </p>

      <h2>9. Third-party links and services</h2>
      <p>
        The website links to lenders, credit bureaus and other third parties. We do not control them and are not
        responsible for their content, terms or privacy practices.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        We provide the website and service &quot;as is&quot;. To the extent the law allows, Amortas is not liable for
        indirect or consequential loss, for a lender&apos;s decision, for loss caused by information you gave us being
        wrong, or for interruptions beyond our control. Nothing in these terms limits liability that cannot be limited
        by law.
      </p>

      <h2>11. Suspension and termination</h2>
      <p>
        We may stop or restrict access if we believe these terms are breached or the service is being misused. You may
        stop using the service at any time and may ask us to delete your data.
      </p>

      <h2>12. Changes</h2>
      <p>
        We may update these terms. The &quot;Last updated&quot; date above shows the current version. Continued use after a
        change means you accept the updated terms.
      </p>

      <h2>13. Governing law and disputes</h2>
      <p>
        These terms are governed by the laws of India. Courts in Delhi, India have exclusive jurisdiction over disputes,
        subject to any rights you have by law. Please raise any complaint with us first through our{" "}
        <Link href="/grievance-redressal">Grievance Redressal</Link> process.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${email}`}>{email}</a>.
      </p>
    </LegalPage>
  );
}
