import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DeleteAccountForm } from "./DeleteAccountForm";

export const metadata: Metadata = buildMetadata({
  title: "Delete Your Amortas Account",
  description:
    "Request deletion of your Amortas account and associated data. Data is retained for 90 days and then permanently deleted.",
  path: "/delete-account",
});

const DELETED_DATA = [
  "Mobile number and email address",
  "Full name, date of birth and gender",
  "PAN details (encrypted and masked copies)",
  "Residential and office address",
  "Employment details and monthly income",
  "Profile photo",
  "Credit report data and credit score history",
  "Existing loan details and EMI reminders",
  "Loan applications and uploaded documents",
];

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container-narrow bg-white p-8 sm:p-12 rounded-2xl border border-icy-blue shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-brand-black mb-3">
          Delete Your Amortas Account
        </h1>
        <p className="text-[#575757] mb-10">
          This page lets users of the <strong>Amortas</strong> app (by Credit Expert India) request that their
          account and associated data be deleted.
        </p>

        <div className="prose prose-slate max-w-none">
          <h2>How to request account deletion</h2>
          <ol>
            <li>Enter the mobile number registered with your Amortas account.</li>
            <li>Enter your email address so we can confirm the request with you.</li>
            <li>Tell us why you want to delete your account.</li>
            <li>
              Tap <strong>Submit Deletion Request</strong>.
            </li>
          </ol>
          <p>
            Once we verify that the request came from the account holder, your account is deactivated and you are
            signed out of all devices.
          </p>

          <h2>What data is deleted</h2>
          <ul>
            {DELETED_DATA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>Retention period</h2>
          <p>
            After your request is processed, your data is retained for <strong>90 days</strong>. During this period
            your account is deactivated and not visible to anyone, and you can contact us to cancel the deletion.
            After 90 days, all of the data listed above is <strong>permanently deleted</strong> and cannot be
            recovered.
          </p>
        </div>

        <div className="mt-12">
          <DeleteAccountForm />
        </div>
      </div>
    </div>
  );
}
