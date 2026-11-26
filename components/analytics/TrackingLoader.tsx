"use client";

import { useEffect } from "react";
import { getConsent, onConsentChange, type ConsentState } from "@/lib/consent";
import { GTM_ID } from "@/lib/analytics/gtmId";

const META_PIXEL_ID = "1194449116344351";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
    dataLayer?: unknown[];
    __gtmLoaded?: boolean;
    __pixelLoaded?: boolean;
  }
}

function loadGtm() {
  if (window.__gtmLoaded) return;
  window.__gtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

function loadMetaPixel() {
  if (window.__pixelLoaded) return;
  window.__pixelLoaded = true;
  /* Standard Meta Pixel bootstrap, run only after "marketing" consent. */
  const queue: unknown[] = [];
  const fbq = function (...args: unknown[]) {
    queue.push(args);
  } as NonNullable<Window["fbq"]>;
  fbq.queue = queue;
  fbq.loaded = true;
  window.fbq = fbq;
  window._fbq = fbq;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

function apply(state: ConsentState | null) {
  // Cookies are accepted by default; only an explicit stored "denied" opts out.
  if (state?.analytics !== "denied") loadGtm();
  if (state?.marketing !== "denied") loadMetaPixel();
}

/**
 * Loads Google Tag Manager only after the visitor grants "analytics", and the
 * Meta Pixel only after they grant "marketing". Nothing third-party loads
 * before a choice is made (DPDP Act 2023 consent; matches the privacy policy).
 * Revoking consent stops future loads; scripts already loaded in this tab stop
 * on the next page load because getConsent() is checked again.
 */
export function TrackingLoader() {
  useEffect(() => {
    apply(getConsent());
    return onConsentChange(apply);
  }, []);
  return null;
}
