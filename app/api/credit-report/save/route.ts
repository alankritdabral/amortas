import { NextRequest, NextResponse } from "next/server";
import { backendErrorStatus, backendRequest } from "@/lib/backendApi";
import { OTP_PROOF_COOKIE, otpProofMatches } from "@/lib/otpProof";

/** Drops null / undefined / empty-string values: the backend validates optional fields only when present. */
function compact<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== null && v !== undefined && v !== "")) as Partial<T>;
}

/**
 * Saves a bureau pull made on the website. The backend parses it into RDS, archives it to S3
 * and records it (with the customer's consent and marketing attribution) for the staff dashboard.
 * Only for a visitor who verified the OTP for that mobile.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, mobile, pan, gender, dob, bureau, credit_score, email, pdf_link, raw_api_data, fallbackData, consent, attribution } = body;

    if (!mobile || !bureau) {
      return NextResponse.json({ success: false, error: "mobile and bureau are required" }, { status: 400 });
    }
    if (!otpProofMatches(req.cookies.get(OTP_PROOF_COOKIE)?.value, mobile)) {
      return NextResponse.json({ success: false, error: "Mobile number is not verified." }, { status: 401 });
    }

    const customerName = String(name || "").trim() || "Website Customer";
    const customerEmail = email ? String(email) : "";
    const saved = await backendRequest<{ id: string; creditReportId: string | null; noHit: boolean }>("POST", "", {
      body: compact({
        bureau: String(bureau),
        raw: raw_api_data ?? null,
        name: customerName,
        mobile: String(mobile),
        pan: String(pan || ""),
        gender,
        dob,
        email: customerEmail,
        pdfLink: pdf_link,
        creditScore: credit_score,
        fallbackData,
        consent: consent ? { ...consent, recordedAt: new Date().toISOString() } : undefined,
        attribution,
        // Same labels the website's reports have always carried in the staff dashboard.
        branch: "customer",
        source: "website",
        fetchedByType: "customer",
        fetchedByName: customerName,
        fetchedByEmail: customerEmail,
        fetchedBy: {
          type: "customer",
          name: customerName,
          email: customerEmail || "N/A",
          branch: "customer",
          role: "customer",
          source: "website",
          timestamp: new Date().toISOString(),
        },
      }),
    });

    return NextResponse.json({ success: true, id: saved.id, no_hit: saved.noHit });
  } catch (err: any) {
    console.error("[credit-report/save]", err?.message || err);
    return NextResponse.json({ success: false, error: "Could not save the report." }, { status: backendErrorStatus(err) });
  }
}
