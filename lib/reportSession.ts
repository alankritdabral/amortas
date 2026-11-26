/**
 * Keeps a fetched credit report in this browser tab's sessionStorage, so a visitor who has already
 * pulled their report is not asked for their details, OTP and consent again as they move between
 * pages. It lives only in the tab: closing the tab clears it, it expires after SESSION_TTL_MS, and the
 * visitor can clear it any time ("Fetch a new report").
 *
 * Deliberately NOT stored: date of birth and the consent tick-boxes. The PAN is stored because the report
 * dashboard derives its edit-session key from it. Every read and write is wrapped in try/catch because
 * sessionStorage can throw (private mode, blocked site data); a failure must never break the page.
 */
const KEY = "amortas_report_session_v1";
const SESSION_TTL_MS = 2 * 60 * 60 * 1000;

export type SavedReportSession = {
  cibilData: unknown;
  formData: Record<string, unknown>;
  savedAt: number;
};

function store(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

export function saveReportSession(cibilData: unknown, formData: Record<string, unknown>): void {
  const { dob: _dob, consent: _c, consentContact: _cc, consentShareWithLenders: _cs, ...keep } = formData;
  void _dob; void _c; void _cc; void _cs;
  try {
    store()?.setItem(KEY, JSON.stringify({ cibilData, formData: keep, savedAt: Date.now() } satisfies SavedReportSession));
  } catch {
    // Storage full or unavailable: the visitor simply is not remembered.
  }
}

export function loadReportSession(now: number = Date.now()): SavedReportSession | null {
  try {
    const raw = store()?.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedReportSession;
    if (!parsed?.cibilData || !parsed.formData || typeof parsed.savedAt !== "number") return null;
    if (now - parsed.savedAt > SESSION_TTL_MS) {
      clearReportSession();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearReportSession(): void {
  try {
    store()?.removeItem(KEY);
  } catch {
    // ignore
  }
}
