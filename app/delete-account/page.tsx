import Link from "next/link";
import { ArrowRight, ShieldCheck, Smartphone, Mail, MessageSquare, Check } from "lucide-react";
import { Metadata } from "next";
import { contact } from "@/lib/config";
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

const STEPS = [
  { icon: Smartphone, title: "Enter your mobile number", text: "Use the number registered with your Amortas account." },
  { icon: Mail, title: "Add your email", text: "So we can confirm the request with you." },
  { icon: MessageSquare, title: "Tell us why", text: "A short reason helps us improve. It does not change the outcome." },
  { icon: ShieldCheck, title: "We verify, then deactivate", text: "Once we confirm it is you, the account is deactivated and signed out everywhere." },
];

const TIMELINE = [
  { when: "Day 0", title: "You submit the request", text: "You get a reference number straight away." },
  { when: "Within 2 working days", title: "We acknowledge and verify", text: "We contact you on the number or email you gave." },
  { when: "Day 0 to 90", title: "Account deactivated", text: "Hidden from everyone. Contact us in this window to cancel the deletion." },
  { when: "After day 90", title: "Permanently deleted", text: "All data listed here is erased and cannot be recovered." },
];

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-white text-[#252525]">
      <div className="h-[84px] bg-white" aria-hidden="true" />
      <section className="bg-[#FFF3E8] border-b border-[#F0E3D8]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
          <p className="text-base font-semibold">Account and data</p>
          <h1 className="mt-3 text-[clamp(36px,8vw,56px)] leading-[1.02] tracking-[-0.04em] font-medium max-w-3xl">
            Delete your Amortas account.
          </h1>
          <p className="mt-5 text-lg md:text-xl leading-[1.5] max-w-2xl">
            Ask us to delete your account and the data tied to it. It takes a minute, and you stay in control for 90 days.
          </p>
          <a
            href="#request"
            className="mt-9 inline-flex items-center gap-2 rounded bg-white font-semibold text-base px-[22px] h-[48px] hover:bg-[#252525] hover:text-white transition-colors"
          >
            Start your request <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16 items-start">
        <div className="min-w-0 space-y-16">
          <section aria-labelledby="how">
            <h2 id="how" className="text-[28px] md:text-[32px] leading-tight tracking-[-0.02em] font-bold">How it works</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {STEPS.map((s, n) => (
                <li key={s.title} className="rounded-lg border border-[#E7E2DD] p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[#FFE4CC]">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-[#626262]">Step {n + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-[#626262] leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[#626262] leading-relaxed">
              Enquiries and credit-report checks made through the website are covered too: use the same form with the mobile
              number you used, or email{" "}
              <a className="font-semibold text-[#252525] underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
          </section>

          <section aria-labelledby="timeline">
            <h2 id="timeline" className="text-[28px] md:text-[32px] leading-tight tracking-[-0.02em] font-bold">What happens after you submit</h2>
            <ol className="mt-8 border-l-2 border-[#E7E2DD] ml-3">
              {TIMELINE.map((t, n) => (
                <li key={t.title} className="relative pl-8 pb-9 last:pb-0">
                  <span
                    className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ring-2 ${
                      n === TIMELINE.length - 1 ? "bg-[#252525] ring-[#252525]" : "bg-[#FD6C01] ring-[#FD6C01]"
                    }`}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold text-[#C94400]">{t.when}</p>
                  <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1 text-[#626262] leading-relaxed">{t.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="data">
            <h2 id="data" className="text-[28px] md:text-[32px] leading-tight tracking-[-0.02em] font-bold">What data is deleted</h2>
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {DELETED_DATA.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FFE4CC]">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="keep" className="rounded-lg bg-[#FFF8F3] border border-[#E7E2DD] p-6 md:p-8">
            <h2 id="keep" className="text-xl font-bold tracking-[-0.01em]">Data we may have to keep</h2>
            <p className="mt-3 text-[#444140] leading-relaxed">
              We may keep limited records where the law requires it, for example for fraud prevention, accounting or to
              defend a legal claim, and only for as long as that need lasts. A lending partner that already received your
              details with your permission holds its own copy under its own policy; ask that lender directly to delete it.
            </p>
            <p className="mt-3 text-[#444140] leading-relaxed">
              See our{" "}
              <Link className="font-semibold text-[#252525] underline underline-offset-4" href="/privacy-policy">Privacy Policy</Link>{" "}
              for your other rights, and{" "}
              <Link className="font-semibold text-[#252525] underline underline-offset-4" href="/grievance-redressal">Grievance Redressal</Link>{" "}
              if your request is not handled.
            </p>
          </section>
        </div>

        <aside id="request" className="lg:sticky lg:top-[108px] scroll-mt-[108px]">
          <DeleteAccountForm />
        </aside>
      </div>
    </div>
  );
}
