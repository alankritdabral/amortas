import { createHash } from "node:crypto";

const GRAPH_VERSION = "v21.0";

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

/** Indian mobile -> Meta's required form: country code + digits, no symbols, then hashed. */
function hashPhone(tenDigits: string): string {
  return sha256(`91${tenDigits.replace(/\D/g, "").slice(-10)}`);
}

export type MetaLeadInput = {
  eventId: string;
  phone: string; // normalised 10-digit
  name?: string;
  fbp?: string;
  fbc?: string;
  ip?: string;
  userAgent?: string;
  sourceUrl?: string;
};

/**
 * Sends a server-side `Lead` to Meta's Conversions API. Same eventId as the browser Pixel's
 * `Lead` so Meta de-duplicates. Deliberately sends NO income, EMI or loan-type data: Meta's
 * business-tools terms prohibit sending sensitive financial information, and ad delivery
 * doesn't need it. Inert unless both env vars are set. Never throws.
 */
export async function sendMetaLead(input: MetaLeadInput): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return;

  try {
    const [first, ...rest] = (input.name || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
    const last = rest.length ? rest[rest.length - 1] : undefined;

    const userData: Record<string, unknown> = {
      ph: [hashPhone(input.phone)],
      country: [sha256("in")],
    };
    if (first) userData.fn = [sha256(first)];
    if (last) userData.ln = [sha256(last)];
    if (input.fbp) userData.fbp = input.fbp;
    if (input.fbc) userData.fbc = input.fbc;
    if (input.ip) userData.client_ip_address = input.ip;
    if (input.userAgent) userData.client_user_agent = input.userAgent;

    const body: Record<string, unknown> = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: input.eventId,
          action_source: "website",
          event_source_url: input.sourceUrl,
          user_data: userData,
          custom_data: { content_name: "contact_form" },
        },
      ],
    };
    if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("Meta CAPI rejected the event:", res.status, await res.text());
  } catch (err) {
    console.error("Meta CAPI error:", err instanceof Error ? err.message : err);
  }
}
