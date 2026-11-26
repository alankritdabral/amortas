import { LENDERS } from "@/lib/lenderEngine";
import { loanCategories } from "@/components/EligibleLoansSlider/loanData";

const BT_INTO_OD = ["kotak", "indusind", "abfl", "chola", "poonawalla", "tatacapital", "piramal"];
const FLAG: Record<string, string> = {
  "personal-loan": "personalLoan",
  "credit-card": "creditCard",
  "app-loans": "appLoan",
  "multiple-loans": "multiplePLs",
};
const MIN = 3000000;

test.each(loanCategories.map((c) => [c.id, c.fundingLenders]))("%s funding lenders match engine data", (id, list) => {
  const ids = (list as { id: string }[]).map((l) => l.id);
  const engine = LENDERS.filter((l: any) => l.maxLoanAmount >= MIN && (id === "overdraft" ? BT_INTO_OD.includes(l.id) : l.bt[FLAG[id as string]])).map((l) => l.id);
  // Every engine-backed entry must be correct, and no eligible engine lender may be missing.
  expect(ids.sort()).toEqual(engine.sort());
});

