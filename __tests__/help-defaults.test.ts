import { REQUIREMENTS, requirementForPath, resolveRequirement, needFromSearch, cleanNeed } from "@/lib/helpDefaults";

describe("requirementForPath", () => {
  it.each([
    ["/personal-loan", "Personal Loan"],
    ["/personal-loan/", "Personal Loan"],
    ["/personal-loan-overdraft", "Overdraft / OD"],
    ["/personal-loan-emi-calculator", "Reduce my EMI"],
    ["/personal-loan-in-mumbai", "Personal Loan"],
    ["/quick-loan-in-pune", "Personal Loan"],
    ["/personal-loan-overdraft-in-delhi", "Overdraft / OD"],
    ["/debt-consolidation", "Consolidate Multiple Loans"],
    ["/debt-consolidation-in-surat", "Consolidate Multiple Loans"],
    ["/calculators/debt-consolidation-calculator", "Consolidate Multiple Loans"],
    ["/loan-balance-transfer", "Loan Balance Transfer"],
    ["/credit-card-debt", "Credit Card Loan"],
    ["/app-loan", "App Loans"],
    ["/free-cibil-score", "Free Credit Score / Report"],
    ["/eligibility", "Check My Eligibility"],
  ])("%s -> %s", (path, expected) => {
    expect(requirementForPath(path)).toBe(expected);
  });

  it("selects nothing on pages with no single topic", () => {
    for (const p of ["/", "/about", "/faq", "/learning-center", "/loans-in-mumbai", "/contact", null, undefined]) {
      expect(requirementForPath(p)).toBe("");
    }
  });

  it("only ever returns an option in the dropdown", () => {
    for (const p of ["/app-loan", "/high-interest-loan", "/emi-savings-calculator"]) {
      expect(REQUIREMENTS).toContain(requirementForPath(p));
    }
  });
});

describe("resolveRequirement", () => {
  it("accepts labels and common link slugs", () => {
    expect(resolveRequirement("Loan Balance Transfer")).toBe("Loan Balance Transfer");
    expect(resolveRequirement("balance-transfer")).toBe("Loan Balance Transfer");
    expect(resolveRequirement("overdraft")).toBe("Overdraft / OD");
    expect(resolveRequirement("CIBIL")).toBe("Free Credit Score / Report");
  });
  it("ignores unknown or empty values", () => {
    expect(resolveRequirement("<script>")).toBe("");
    expect(resolveRequirement("")).toBe("");
    expect(resolveRequirement(null)).toBe("");
  });
});

describe("needFromSearch", () => {
  it("maps known values, keeps custom ones, and reads utm_term", () => {
    expect(needFromSearch("?need=balance-transfer")).toBe("Loan Balance Transfer");
    expect(needFromSearch("?need=Wedding%20loan")).toBe("Wedding loan");
    expect(needFromSearch("?utm_term=home%20renovation%20loan")).toBe("home renovation loan");
    expect(needFromSearch("?x=1")).toBe("");
  });
  it("strips markup and caps length", () => {
    expect(cleanNeed("<script>x</script>")).not.toMatch(/[<>]/);
    expect(cleanNeed("a".repeat(100))).toHaveLength(60);
  });
});
