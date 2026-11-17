"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getConsent, onConsentChange } from "@/lib/consent";
import { META_PIXEL_ID } from "@/lib/meta/client";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; loaded: boolean; version: string; push: unknown };

function loadPixel(id: string) {
  if (window.fbq) return;
  // Meta's standard base code, unminified. Nothing is requested from Meta until this runs,
  // and this only runs after the visitor accepts ad measurement.
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", id);
}

/**
 * Mounted once in the root layout. Loads the Meta Pixel only if a Pixel ID is configured
 * (NEXT_PUBLIC_META_PIXEL_ID) and the visitor has accepted ad measurement; fires PageView on
 * every route change; stops tracking if consent is withdrawn.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const id = META_PIXEL_ID;
    const sync = (granted: boolean) => {
      if (granted) {
        loadPixel(id);
        window.fbq?.("consent", "grant");
      } else {
        window.fbq?.("consent", "revoke");
      }
    };
    sync(getConsent()?.marketing === "granted");
    return onConsentChange((state) => {
      sync(state?.marketing === "granted");
      if (state?.marketing === "granted") lastPath.current = null; // send PageView for the current page
    });
  }, []);

  useEffect(() => {
    if (!META_PIXEL_ID || getConsent()?.marketing !== "granted") return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
