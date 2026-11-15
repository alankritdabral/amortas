import { NextRequest, NextResponse } from "next/server";
import { backendErrorStatus, backendRequest } from "@/lib/backendApi";
import { OTP_PROOF_COOKIE, otpProofMatches } from "@/lib/otpProof";

interface BackendLookup {
  found: boolean;
  bureau?: string;
  createdAt?: string;
  rawApiData?: any;
  fallbackData?: any;
  overrides?: any;
}

/**
 * Returns the customer's most recent stored report for a bureau, so the form can reuse it
 * instead of paying for a new pull. Only for a visitor who verified the OTP for that mobile.
 *
 * Answer: { exists: false } or { exists: true, bureau, created_at, raw_api_data, fallbackData, overrides }.
 */
export async function POST(req: NextRequest) {
  try {
    const { pan, mobile, bureau } = await req.json();
    if (!mobile || !bureau) {
      return NextResponse.json({ error: "mobile and bureau are required" }, { status: 400 });
    }
    if (!otpProofMatches(req.cookies.get(OTP_PROOF_COOKIE)?.value, mobile)) {
      return NextResponse.json({ error: "Mobile number is not verified." }, { status: 401 });
    }

    const lookup = (code: string) =>
      backendRequest<BackendLookup>("POST", "/lookup", { body: { mobile: String(mobile), pan: pan ? String(pan) : undefined, bureau: code } });

    let found = await lookup(String(bureau));

    // An Experian request that fell back to CRIF is stored as a CRIF report. Asking for Experian
    // again must find it, otherwise the customer would trigger (and we would pay for) both pulls again.
    if (!found.found && String(bureau).startsWith("experian")) {
      const crif = await lookup("crif_v1");
      if (crif.found && crif.fallbackData?.fallback_from_experian) found = crif;
    }

    if (!found.found) return NextResponse.json({ exists: false });
    return NextResponse.json({
      exists: true,
      bureau: found.bureau,
      created_at: found.createdAt,
      raw_api_data: found.rawApiData ?? null,
      fallbackData: found.fallbackData ?? null,
      overrides: found.overrides ?? null,
    });
  } catch (err: any) {
    console.error("[credit-report/lookup]", err?.message || err);
    return NextResponse.json({ error: "Could not check for a stored report." }, { status: backendErrorStatus(err) });
  }
}
