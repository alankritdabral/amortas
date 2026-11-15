import { createOtpProof, otpProofMatches, readOtpProof, OTP_PROOF_TTL_SECONDS } from "../lib/otpProof";

describe("OTP proof token", () => {
  const original = process.env.HMAC_SECRET;
  beforeAll(() => {
    process.env.HMAC_SECRET = "test-secret-for-otp-proof";
  });
  afterAll(() => {
    process.env.HMAC_SECRET = original;
  });

  it("accepts a fresh proof for the same mobile", () => {
    const token = createOtpProof("9876543210");
    expect(readOtpProof(token)).toBe("9876543210");
    expect(otpProofMatches(token, "9876543210")).toBe(true);
    expect(otpProofMatches(token, "+91 98765 43210")).toBe(true);
  });

  it("does not let a proof for one mobile unlock another", () => {
    expect(otpProofMatches(createOtpProof("9876543210"), "9876543211")).toBe(false);
  });

  it("rejects a missing, malformed or tampered token", () => {
    const token = createOtpProof("9876543210");
    const [mobile, expiry, signature] = token.split(".");
    expect(readOtpProof(undefined)).toBeNull();
    expect(readOtpProof("garbage")).toBeNull();
    expect(readOtpProof(`9876543211.${expiry}.${signature}`)).toBeNull();
    expect(readOtpProof(`${mobile}.${Number(expiry) + 1000}.${signature}`)).toBeNull();
    expect(readOtpProof(`${mobile}.${expiry}.${"0".repeat(signature.length)}`)).toBeNull();
  });

  it("expires", () => {
    const issued = Date.now();
    const token = createOtpProof("9876543210", issued);
    expect(readOtpProof(token, issued + OTP_PROOF_TTL_SECONDS * 1000 - 1000)).toBe("9876543210");
    expect(readOtpProof(token, issued + OTP_PROOF_TTL_SECONDS * 1000 + 1000)).toBeNull();
  });

  it("rejects a token signed with a different secret", () => {
    const token = createOtpProof("9876543210");
    process.env.HMAC_SECRET = "another-secret";
    expect(readOtpProof(token)).toBeNull();
    process.env.HMAC_SECRET = "test-secret-for-otp-proof";
  });
});
