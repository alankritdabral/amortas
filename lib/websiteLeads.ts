import { backendRequest } from "./backendApi";

/**
 * Stores one website enquiry in RDS through the backend. Staff see it in the dashboard, grouped
 * with the same customer's other enquiries and credit reports (matched on phone number).
 * Server-side only. Throws when the backend is unconfigured or unreachable.
 */
export async function saveWebsiteLead(lead: {
  name: string;
  phone: string;
  requirement?: string;
  netSalary?: number;
  ongoingEmi?: number;
  city?: string;
  source: string;
  consent?: unknown;
  attribution?: unknown;
  extra?: unknown;
}): Promise<string> {
  const saved = await backendRequest<{ id: string }>("POST", "", {
    basePath: "/internal/website-leads",
    body: lead,
  });
  return saved.id;
}
