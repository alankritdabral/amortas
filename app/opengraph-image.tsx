import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/config";

export const alt = `${siteConfig.name} — Debt Consolidation & Personal Loans`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The site-wide default share image (also the picture WhatsApp shows in a chat link preview):
 * the exact Amortas logo on white, generated at build time. Any route with its own opengraph-image.tsx (the
 * learning-center articles) gets that one instead — see buildMetadata's own
 * comment for why no page sets an explicit `images` any more.
 */
export default async function Image() {
  // The real brand logo (orange mark + "Amortas" wordmark), unaltered, on white: no recoloured badge.
  const logo = await readFile(join(process.cwd(), "public/img/logo_with_name.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          borderBottom: "24px solid #FD6C01",
          padding: "0 80px",
        }}
      >
        <img src={logoSrc} alt="" width={900} height={270} />
        <div style={{ display: "flex", marginTop: 24, fontSize: 44, fontWeight: 700, color: "#252525", textAlign: "center", lineHeight: 1.2 }}>
          Debt Consolidation & Personal Loans
        </div>
        <div style={{ display: "flex", marginTop: 14, fontSize: 30, fontWeight: 500, color: "#5F5F5F" }}>
          for Salaried Professionals
        </div>
      </div>
    ),
    { ...size }
  );
}
