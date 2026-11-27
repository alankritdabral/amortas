import type { City } from "@/lib/cities";
import type { CityFacts } from "@/lib/cityFacts";

/** "2026-11-27" to "27 November 2026". */
function formatVerified(iso: string): string {
  const d = new Date(`${iso}T00:00:00+05:30`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
}

/**
 * First-hand local section. Rendered only for cities that have enough facts
 * (factsFor in lib/cityFacts.ts), so it never shows empty or invented text.
 */
export function CityLocalNotes({ city, facts }: { city: City; facts: CityFacts }) {
  return (
    <section className="text-[#252525] border-t border-[#E5E5E5]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
        <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">
          How we work in {city.name}.
        </h2>
        <p className="mt-4 text-lg text-[#626262] leading-relaxed max-w-3xl">{facts.overview}</p>

        {facts.localNotes && facts.localNotes.length > 0 && (
          <ul role="list" className="mt-6 space-y-3 max-w-3xl list-disc pl-6 text-lg text-[#626262] leading-relaxed">
            {facts.localNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}

        {facts.lenders && facts.lenders.length > 0 && (
          <div className="mt-8 max-w-3xl">
            <h3 className="text-2xl font-bold">Lenders we have worked with for customers in {city.name}</h3>
            <p className="mt-2 text-lg text-[#626262]">{facts.lenders.join(", ")}.</p>
            <p className="mt-2 text-sm text-[#626262]">
              This is not an offer or a promise of approval. Each lender decides on its own criteria.
            </p>
          </div>
        )}

        <p className="mt-6 text-sm text-[#626262]">Last verified {formatVerified(facts.verifiedOn)}.</p>
      </div>
    </section>
  );
}
