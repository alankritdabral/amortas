import crypto from "crypto";

/**
 * Proof that this browser verified an OTP for a mobile number.
 *
 * `/api/otp/verify` sets it as an httpOnly cookie when the code is correct. The credit-report
 * routes require it, so a stored report (and the right to save one) is only available to someone
 * who actually received the OTP on that number — knowing a PAN and mobile is not enough.
 *
 * Token: "<mobile>.<expiry ms>.<HMAC-SHA256 of the first two parts>", signed with HMAC_SECRET.
 */
export const OTP_PROOF_COOKIE = "ce_otp_proof";
/** Long enough to view the report and save edits; short enough that a shared computer forgets it. */
export const OTP_PROOF_TTL_SECONDS = 2 * 60 * 60;

function sign(payload: string): string {
  const secret = process.env.HMAC_SECRET;
  if (!secret) throw new Error("HMAC_SECRET is not configured");
  return crypto.createHmac("sha256", secret).update(`otp-proof:${payload}`).digest("hex");
}

const cleanMobile = (mobile: string) => String(mobile || "").replace(/\D/g, "").slice(-10);

export function createOtpProof(mobile: string, now = Date.now()): string {
  const payload = `${cleanMobile(mobile)}.${now + OTP_PROOF_TTL_SECONDS * 1000}`;
  return `${payload}.${sign(payload)}`;
}

/** The verified mobile number, or null when the token is missing, forged or expired. */
export function readOtpProof(token: string | undefined | null, now = Date.now()): string | null {
  if (!token) return null;
  const [mobile, expiry, signature] = token.split(".");
  if (!mobile || !expiry || !signature || !/^\d{10}$/.test(mobile)) return null;

  let expected: string;
  try {
    expected = sign(`${mobile}.${expiry}`);
  } catch {
    return null;
  }
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (!(Number(expiry) > now)) return null;
  return mobile;
}

/** True when the proof belongs to exactly this mobile number. */
export function otpProofMatches(token: string | undefined | null, mobile: string): boolean {
  const verified = readOtpProof(token);
  return !!verified && verified === cleanMobile(mobile);
}
