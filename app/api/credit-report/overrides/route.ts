import { NextRequest, NextResponse } from "next/server";
import { backendErrorStatus, backendRequest } from "@/lib/backendApi";
import { OTP_PROOF_COOKIE, otpProofMatches } from "@/lib/otpProof";

/**
 * Stores the edits a customer made in the report viewer (income, EMIs, ...) on their latest
 * stored report for that bureau. Only for a visitor who verified the OTP for that mobile.
 */
export async function POST(req: NextRequest) {
  try {
    const { pan, mobile, bureau, overrides } = await req.json();
    if (!mobile || !bureau || !overrides || typeof overrides !== "object") {
      return NextResponse.json({ success: false, error: "mobile, bureau and overrides are required" }, { status: 400 });
    }
    if (!otpProofMatches(req.cookies.get(OTP_PROOF_COOKIE)?.value, mobile)) {
      return NextResponse.json({ success: false, error: "Mobile number is not verified." }, { status: 401 });
    }

    await backendRequest("POST", "/overrides", {
      body: { mobile: String(mobile), pan: pan ? String(pan) : undefined, bureau: String(bureau), overrides },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[credit-report/overrides]", err?.message || err);
    return NextResponse.json({ success: false, error: "Could not save your changes." }, { status: backendErrorStatus(err) });
  }
}
