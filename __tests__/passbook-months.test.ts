import { passbookMonths } from "@/lib/passbookMonths";

describe("lib/passbookMonths", () => {
  it("labels the current and next month", () => {
    expect(passbookMonths(new Date(2026, 10, 25))).toEqual({ header: "NOV 2026", current: "NOV", next: "DEC" });
  });

  it("rolls December over to January", () => {
    expect(passbookMonths(new Date(2026, 11, 31))).toEqual({ header: "DEC 2026", current: "DEC", next: "JAN" });
  });

  it("handles the first and last day of a month", () => {
    expect(passbookMonths(new Date(2027, 0, 1)).current).toBe("JAN");
    expect(passbookMonths(new Date(2027, 1, 28)).next).toBe("MAR");
  });
});
