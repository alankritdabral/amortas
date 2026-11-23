import type { AnchorHTMLAttributes } from "react";

/**
 * "Chat on WhatsApp" link. It opens /whatsapp-chat, which redirects to a randomly chosen
 * employee from the backend roster. Each click is a fresh draw; no number is exposed in the page.
 */
export function WhatsAppChatLink({
  children,
  ...rest
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel">) {
  return (
    <a {...rest} href="/whatsapp-chat" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
