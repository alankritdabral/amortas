import { NextResponse } from "next/server";
import { backendRequest } from "@/lib/backendApi";
import { contact } from "@/lib/config";

// Every "Chat on WhatsApp" button points here. It sends the visitor to the WhatsApp chat of one
// randomly chosen active lead-team employee, read from the backend (table lead_employees), so the
// roster is managed in the dashboard and no employee number is hardcoded in the site.
export const dynamic = "force-dynamic";

const ROSTER_TTL_MS = 60_000;
let cache: { numbers: string[]; at: number } | null = null;

async function activeNumbers(): Promise<string[]> {
  if (cache && Date.now() - cache.at < ROSTER_TTL_MS) return cache.numbers;
  const { employees } = await backendRequest<{ employees: { phone: string; active: boolean }[] }>(
    "GET",
    "/employees",
    { basePath: "/internal/website-leads" },
  );
  const numbers = employees
    .filter((e) => e.active && e.phone)
    .map((e) => e.phone.replace(/\D/g, "").slice(-10))
    .filter((p) => p.length === 10)
    .map((p) => `91${p}`);
  cache = { numbers, at: Date.now() };
  return numbers;
}

export async function GET(request: Request) {
  let numbers: string[] = [];
  try {
    numbers = await activeNumbers();
  } catch (err) {
    console.error("WhatsApp roster lookup failed:", err);
    if (cache) numbers = cache.numbers; // stale roster beats none
  }
  // No roster available: send them to the contact form rather than a wrong number.
  if (numbers.length === 0) return NextResponse.redirect(new URL("/contact#contact-form", request.url));

  const number = numbers[Math.floor(Math.random() * numbers.length)];
  const custom = new URL(request.url).searchParams.get("text")?.slice(0, 300);
  const text = encodeURIComponent(custom || contact.whatsappMessage);
  const res = NextResponse.redirect(`https://wa.me/${number}?text=${text}`, 307);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
