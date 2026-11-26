import { clearReportSession, loadReportSession, saveReportSession } from "@/lib/reportSession";

function fakeWindow() {
  const mem = new Map<string, string>();
  (globalThis as any).window = {
    sessionStorage: {
      getItem: (k: string) => mem.get(k) ?? null,
      setItem: (k: string, v: string) => void mem.set(k, v),
      removeItem: (k: string) => void mem.delete(k),
    },
  };
  return mem;
}

afterEach(() => {
  delete (globalThis as any).window;
});

describe("reportSession", () => {
  it("round-trips a report and its form details", () => {
    fakeWindow();
    saveReportSession({ score: 780 }, { firstName: "A", mobile: "9876543210", pan: "ABCDE1234F", bureau: "experian" });
    const got = loadReportSession();
    expect(got?.cibilData).toEqual({ score: 780 });
    expect(got?.formData.mobile).toBe("9876543210");
  });

  it("never stores date of birth or the consent ticks", () => {
    const mem = fakeWindow();
    saveReportSession({ a: 1 }, { firstName: "A", dob: "1990-01-01", consent: true, consentContact: true, consentShareWithLenders: true });
    const raw = [...mem.values()][0];
    expect(raw).not.toContain("1990-01-01");
    expect(raw).not.toContain("consent");
  });

  it("expires after two hours and removes the entry", () => {
    const mem = fakeWindow();
    saveReportSession({ a: 1 }, { firstName: "A" });
    expect(loadReportSession(Date.now() + 2 * 60 * 60 * 1000 + 1000)).toBeNull();
    expect(mem.size).toBe(0);
  });

  it("clears on request and survives corrupt data or missing storage", () => {
    const mem = fakeWindow();
    saveReportSession({ a: 1 }, { firstName: "A" });
    clearReportSession();
    expect(loadReportSession()).toBeNull();
    mem.set("amortas_report_session_v1", "{not json");
    expect(loadReportSession()).toBeNull();
    delete (globalThis as any).window;
    expect(() => saveReportSession({ a: 1 }, {})).not.toThrow();
    expect(loadReportSession()).toBeNull();
  });
});
