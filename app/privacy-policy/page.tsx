import Link from "next/link";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalPage, grievanceEmail } from "@/components/legal/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "What personal data Amortas collects for loan enquiries and credit checks, who sees it, how long we keep it, and your rights under the DPDP Act 2023.",
  path: "/privacy-policy",
});

// NOTE: drafted to match what the site and its APIs actually do (forms, /api/*,
// lib/consent.ts). It has NOT been reviewed by legal counsel: have it reviewed
// before treating it as final, and update it whenever a new data flow is added.

export default function PrivacyPolicyPage() {
  const email = grievanceEmail();
  return (
    <LegalPage
      path="/privacy-policy"
      title="Privacy Policy"
      intro="This policy explains what personal data Amortas collects, why, who it is shared with, how long we keep it, and the choices you have. It applies to amortas.com and the enquiry, eligibility and calculator forms on it."
    >
      <h2>1. Who we are</h2>
      <p>
        Amortas is a loan facilitator: we help you compare loan options and debt-consolidation routes, and we pass your
        enquiry to partner lenders only when you allow it. We are not a bank or NBFC and we do not lend money ourselves
        (see <Link href="/partner-disclosures">Partner disclosures</Link>). For the purposes of the Digital Personal Data
        Protection Act, 2023 (&quot;DPDP Act&quot;), Amortas is the data fiduciary for the data described here.
      </p>

      <h2>2. What we collect</h2>
      <p>What we collect depends on what you use. We ask only for what each step needs.</p>
      <ul>
        <li>
          <strong>Contact enquiry form:</strong> name, mobile number, what you need help with, net monthly salary and
          existing monthly EMIs.
        </li>
        <li>
          <strong>Eligibility check:</strong> first and last name, mobile number (verified with a one-time password),
          email, city, employment type, monthly income, employer, how your salary is paid, the loan you want, PAN, date
          of birth and gender.
        </li>
        <li>
          <strong>Credit report:</strong> if you consent, we retrieve your credit report from a credit information
          company (Experian, CIBIL or CRIF High Mark, as you choose). This contains your credit accounts, balances,
          repayment history and score. We store the report so we can show it to you and compute your eligibility.
        </li>
        <li>
          <strong>Calculator lead form:</strong> the contact details and loan figures you type into the calculator when
          you ask us to contact you.
        </li>
        <li>
          <strong>Account deletion requests:</strong> mobile number, email, reason and any details you give.
        </li>
        <li>
          <strong>Technical data:</strong> device and browser type, pages viewed, clicks, approximate location from your
          IP address, how you arrived at the site (for example the campaign link), and error and performance logs.
        </li>
        <li>
          <strong>Consent records:</strong> what you agreed to, which notice version you saw, and when.
        </li>
      </ul>
      <p>
        We do not knowingly collect data from anyone under 21. Our eligibility form asks you to confirm you are 21 or
        older. If you believe a minor has submitted data, write to us and we will delete it.
      </p>

      <h2>3. Why we use it, and the consent behind it</h2>
      <p>
        We ask for separate permissions, and you can use the site without giving the optional ones:
      </p>
      <ul>
        <li>
          <strong>To contact you about your enquiry</strong> (call, SMS, WhatsApp, email): needed to respond to the
          request you made.
        </li>
        <li>
          <strong>To retrieve and analyse your credit report</strong>: only if you tick that permission. It lets us
          show your eligibility across our partner lenders.
        </li>
        <li>
          <strong>To share your details with partner lenders</strong>: only if you tick that permission. Lenders then
          assess your application under their own policies.
        </li>
        <li>
          <strong>To run and secure the service</strong>: preventing fraud and abuse, verifying your mobile number,
          fixing errors and meeting legal obligations.
        </li>
        <li>
          <strong>To understand how the site is used</strong> (analytics, recordings, ad measurement): only after you
          accept them in the cookie banner. See section 6.
        </li>
      </ul>
      <p>You can withdraw any permission at any time (section 9). Withdrawal does not affect what was done before it.</p>

      <h2>4. Who we share data with</h2>
      <ul>
        <li>
          <strong>Partner lenders</strong> (banks and NBFCs listed on{" "}
          <Link href="/partner-disclosures">Partner disclosures</Link>): only if you allowed sharing. Each lender then
          processes your data under its own privacy policy.
        </li>
        <li>
          <strong>Credit information companies</strong> (Experian, CIBIL, CRIF High Mark) and our bureau-access
          provider (IDSPay): to retrieve your credit report when you ask us to.
        </li>
        <li>
          <strong>Messaging and verification providers</strong> (MessageBot, MSG91): to send one-time passwords and
          WhatsApp or SMS messages.
        </li>
        <li>
          <strong>Hosting and infrastructure providers</strong> (including Vercel, Google Firebase and Amazon Web
          Services): to run the website and store data.
        </li>
        <li>
          <strong>Analytics and advertising providers</strong>, only with your consent: Google (Analytics and Tag
          Manager), Microsoft (Clarity), Meta (Pixel). See section 6.
        </li>
        <li>
          <strong>Authorities</strong>, where the law requires it or to protect against fraud.
        </li>
      </ul>
      <p>We do not sell your personal data.</p>

      <h2>5. Where data is stored and how it is protected</h2>
      <p>
        Data is stored with cloud providers and may be processed outside India by those providers. We restrict access to
        staff who need it to help you, send data between your browser and our servers over HTTPS, and keep the keys to
        our systems on the server only. No online system is perfectly secure. If a personal-data breach affects you, we
        will notify you and the Data Protection Board of India as the DPDP Act requires.
      </p>

      <h2>6. Cookies, analytics and advertising</h2>
      <p>
        <strong>Your report in this browser tab:</strong> after you fetch your credit report, we keep it, together with the
        details you entered (including your PAN but not your date of birth), in your browser&apos;s session storage so we
        do not ask you again as you move between pages. It stays on your device only, is removed when you close the tab or
        after 2 hours, and you can remove it any time with &quot;Fetch a new report&quot;. On a shared computer, close the
        tab when you are done.
      </p>
      <p>
        When you first visit, a banner asks what you allow. Nothing in the optional list loads before you choose:
      </p>
      <ul>
        <li>
          <strong>Usage analytics (Google Analytics, Google Tag Manager):</strong> which pages are used and how people
          move through the site. Google Analytics runs in a restricted, cookie-less mode until you accept. Ad
          personalisation is always off.
        </li>
        <li>
          <strong>Session recordings (Microsoft Clarity):</strong> anonymised mouse movement and scrolling. Form fields
          are blanked.
        </li>
        <li>
          <strong>Ad measurement (Meta Pixel):</strong> lets us see which Facebook and Instagram ads led to an enquiry.
          If you submit an enquiry, your mobile number is shared with Meta in hashed form for this purpose only. Your
          income, EMIs and loan details are not shared.
        </li>
      </ul>
      <p>
        We also use Vercel Analytics and basic performance measurement, which do not use advertising identifiers. Your
        browser stores your cookie choice in local storage. Change it at any time through &quot;Cookie settings&quot; in
        the footer. More detail is on the <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>7. How long we keep data</h2>
      <p>
        We keep personal data only as long as needed for the purpose it was collected for, and as long as the law or a
        lender&apos;s regulatory duties require. When you ask us to delete your data we act within 90 days (see{" "}
        <Link href="/delete-account">Delete your data</Link>), except for records we must keep by law or to defend a
        legal claim. Analytics data is kept for up to 14 months and session recordings for 30 days.
      </p>

      <h2>8. Your rights</h2>
      <p>Under the DPDP Act you can:</p>
      <ul>
        <li>ask for a summary of the personal data we hold about you and who we shared it with;</li>
        <li>ask us to correct inaccurate data or complete incomplete data;</li>
        <li>ask us to erase your data;</li>
        <li>withdraw consent as easily as you gave it;</li>
        <li>nominate another person to exercise these rights if you die or become unable to;</li>
        <li>complain to us, and then to the Data Protection Board of India if we do not resolve it.</li>
      </ul>

      <h2>9. How to use your rights or make a complaint</h2>
      <p>
        Email <a href={`mailto:${email}`}>{email}</a> from the address or phone number you used with us, or use the{" "}
        <Link href="/delete-account">deletion form</Link>. We may ask you to verify your identity first. We aim to acknowledge
        your request within 2 working days and to resolve it within 30 days. If we have not resolved your complaint, see our{" "}
        <Link href="/grievance-redressal">Grievance Redressal</Link> page for escalation steps.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We will post any change here with a new &quot;Last updated&quot; date. For material changes to what we collect or
        share, we will ask for your consent again where the law requires it.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about this policy: <a href={`mailto:${email}`}>{email}</a>.
      </p>
    </LegalPage>
  );
}
