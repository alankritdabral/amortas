import { NextResponse } from "next/server";
import { saveWebsiteLead } from "@/lib/websiteLeads";
import { backendErrorStatus } from "@/lib/backendApi";
import { checkRateLimit } from "@/lib/analytics/rateLimit";

const REASONS = [
  "I no longer need the app",
  "I have privacy concerns",
  "I have a duplicate account",
  "The app did not meet my needs",
  "Other",
];

/**
 * Records a data-deletion request (DPDP Act right to erasure / Play Store
 * data-deletion policy). It is stored with the backend as a website record with
 * source "delete-account-request" so staff can action it within the stated 90
 * days. The request is NOT a marketing lead: the consent object has
 * `contact: true` only so staff can reply about the request itself.
 */
export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!(await checkRateLimit(`delete-request:${ip}`, 5, 3600))) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await request.json();
    const phone = String(body.phone ?? "").replace(/[\s-]/g, "").replace(/^(\+91|0)/, "");
    const email = String(body.email ?? "").trim().slice(0, 200);
    const reason = String(body.reason ?? "");
    const details = String(body.details ?? "").trim().slice(0, 1000);

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "Please enter a valid 10-digit Indian mobile number." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!REASONS.includes(reason)) {
      return NextResponse.json({ error: "Please choose a reason." }, { status: 400 });
    }
    if (reason === "Other" && !details) {
      return NextResponse.json({ error: "Please describe your reason." }, { status: 400 });
    }

    const id = await saveWebsiteLead({
      name: "Data deletion request",
      phone,
      requirement: `DELETION REQUEST (not a sales lead): ${reason}`,
      source: "delete-account-request",
      consent: { contact: true, shareWithLenders: false },
      extra: { email, reason, details, requestedAt: new Date().toISOString() },
    });

    return NextResponse.json({ success: true, reference: id });
  } catch (error) {
    console.error("[delete-request] error", error);
    return NextResponse.json({ error: "Something went wrong. Please email us instead." }, { status: backendErrorStatus(error) });
  }
}
