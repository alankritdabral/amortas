const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;

export type PassbookMonths = {
  /** Header label, e.g. "NOV 2026" */
  header: string;
  /** Month shown beside the four old debits, e.g. "NOV" */
  current: string;
  /** Month of the single consolidated EMI, e.g. "DEC" (JAN after DEC) */
  next: string;
};

/** Month labels for the hero passbook, derived from a date so they follow the calendar. */
export function passbookMonths(date: Date): PassbookMonths {
  const m = date.getMonth();
  return {
    header: `${MONTHS[m]} ${date.getFullYear()}`,
    current: MONTHS[m],
    next: MONTHS[(m + 1) % 12],
  };
}
