import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";
import { LENDERS } from "@/lib/lenderEngine";
import Link from "next/link";
import { contact } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Partner Disclosures",
  description:
    "How Amortas works with lending partners, how we are compensated, and what we never guarantee about loan approval.",
  path: "/partner-disclosures",
});

export default function PartnerDisclosuresPage() {
  return (
    <LegalPage
      path="/partner-disclosures"
      title="Partner Disclosures"
      intro="How Amortas works with lending partners, how we are paid, and what we never guarantee."
    >
      <p>
        Amortas operates as an independent loan facilitator. We are not a lender, bank, or NBFC (Non-Banking Financial Company).
      </p>
      <p>
        Our services aim to connect individuals with potential lending partners based on their financial profile and needs. We currently work with the RBI-registered banks and NBFCs listed below to provide a range of debt consolidation and personal loan options. This list changes from time to time as our lending network grows.
      </p>
      <h2>Our Current Lending Partners</h2>
      <ul>
        {LENDERS.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <h2>How We Are Compensated</h2>
      <p>
        Amortas may receive compensation from our lending partners when a user is successfully matched, applies for, or is approved for a loan product through our platform. This compensation is paid by the lender, never by you, and does not impact the interest rates or fees that are offered to you.
      </p>
      <h2>No Guarantee of Approval</h2>
      <p>
        While we strive to find the best financial solutions for our users, we do not guarantee that your application will be approved by any specific lender. All final decisions regarding loan approval, loan amounts, interest rates, and other terms are made solely by the respective lending partner based on their proprietary underwriting criteria, which may include a review of your credit history, income, and debt-to-income ratio.
      </p>
      <h2>Independent Verification</h2>
      <p>
        We encourage all users to carefully review the terms and conditions of any loan offer provided by a lending partner before accepting it. Ensure you understand all fees, interest rates, repayment schedules, and potential penalties.
      </p>
      <h2>Grievance Redressal</h2>
      <p>
        Complaints about Amortas or about how a lending partner handled an application that came through us can be
        raised by email at <a href={`mailto:${contact.email}`}>{contact.email}</a>. Our full escalation steps, including
        the Grievance Officer and the RBI Complaint Management System, are on the{" "}
        <Link href="/grievance-redressal">Grievance Redressal</Link> page.
      </p>
      <h2>Our role and your loan agreement</h2>
      <p>
        Amortas does not issue loans. Your loan agreement, Key Fact Statement, interest rate, fees, cooling-off period
        and repayment terms are set by the lender, which is also responsible for them. Always read these before you
        accept an offer. We recommend you confirm each lender&apos;s RBI registration on the RBI website (rbi.org.in).
      </p>
    </LegalPage>
  );
}
