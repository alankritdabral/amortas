import { NextResponse } from "next/server";
import { verifyStoredOtp } from "@/lib/otpStore";
import { createOtpProof, OTP_PROOF_COOKIE, OTP_PROOF_TTL_SECONDS } from "@/lib/otpProof";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mobile, otp } = body;

    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, error: "Mobile number and OTP are required" },
        { status: 400 }
      );
    }

    const cleanMobile = String(mobile).replace(/\D/g, "").slice(-10);
    const cleanOtp = String(otp).trim();

    if (cleanMobile.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Invalid mobile number" },
        { status: 400 }
      );
    }

    if (!cleanOtp) {
      return NextResponse.json(
        { success: false, error: "Please enter the verification code" },
        { status: 400 }
      );
    }

    const verificationResult = await verifyStoredOtp(cleanMobile, cleanOtp);

    if (verificationResult.success) {
      const response = NextResponse.json({
        success: true,
        message: "Mobile number verified successfully",
      });
      // Server-side proof of this verification; the credit-report routes require it.
      response.cookies.set(OTP_PROOF_COOKIE, createOtpProof(cleanMobile), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/api/credit-report",
        maxAge: OTP_PROOF_TTL_SECONDS,
      });
      return response;
    } else {
      return NextResponse.json(
        {
          success: false,
          error: verificationResult.error || "Invalid verification code",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("[OTP Verify] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
