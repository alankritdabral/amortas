"use client";

import { getConsent } from "@/lib/consent";
import type { Attribution } from "@/lib/analytics/sanitizeAttribution";

type Touches = { firstTouch?: Attribution; lastTouch?: Attribution };

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

/** True only when a Pixel is configured AND the visitor accepted ad measurement. */
export function metaAllowed(): boolean {
  return !!META_PIXEL_ID && getConsent()?.marketing === "granted";
}

/** One id shared by the browser Pixel event and the server CAPI event so Meta counts the lead once. */
export function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

function cookie(name: string): string | undefined {
  try {
    return document.cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.slice(name.length + 1);
  } catch {
    return undefined;
  }
}

/** Meta's browser (_fbp) and click (_fbc) identifiers. If the _fbc cookie isn't set yet but the
 * visitor arrived from an ad (fbclid), build it in Meta's documented format. */
export function metaBrowserIds(attribution?: Touches): { fbp?: string; fbc?: string } {
  const fbp = cookie("_fbp");
  let fbc = cookie("_fbc");
  const fbclid = attribution?.lastTouch?.fbclid || attribution?.firstTouch?.fbclid;
  if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  return { fbp, fbc };
}

export function trackMeta(name: string, params: Record<string, unknown> = {}, eventId?: string): void {
  try {
    if (!metaAllowed()) return;
    window.fbq?.("track", name, params, eventId ? { eventID: eventId } : undefined);
  } catch {
    // Ad measurement must never break the page.
  }
}
