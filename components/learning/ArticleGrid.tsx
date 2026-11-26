"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";

export type CardItem = { slug: string; title: string; summary: string; topic: string; minutes: number };

/** Topic filter chips + article card grid for the learning-center index. */
export function ArticleGrid({ items, topics }: { items: CardItem[]; topics: string[] }) {
  const [topic, setTopic] = useState("All");
  const shown = topic === "All" ? items : items.filter((i) => i.topic === topic);
  return (
    <div>
      <div role="group" aria-label="Filter guides by topic" className="flex flex-wrap gap-2">
        {["All", ...topics].map((t) => {
          const on = t === topic;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              onClick={() => setTopic(t)}
              className={`h-10 rounded-full border px-4 text-sm font-semibold transition-colors ${
                on ? "border-[#252525] bg-[#252525] text-white" : "border-[#D3CDC7] bg-white text-[#252525] hover:border-[#252525]"
              }`}
            >
              {t}
              <span className={`ml-2 ${on ? "text-white/70" : "text-[#626262]"}`}>
                {t === "All" ? items.length : items.filter((i) => i.topic === t).length}
              </span>
            </button>
          );
        })}
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/learning-center/${a.slug}`}
              className="group flex h-full flex-col rounded-lg border border-[#E7E2DD] bg-white p-6 transition-colors hover:border-[#252525]"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="rounded bg-[#FFE4CC] px-2.5 py-1 font-semibold text-[#252525]">{a.topic}</span>
                <span className="inline-flex items-center gap-1.5 text-[#626262]">
                  <Clock className="h-4 w-4" aria-hidden="true" /> {a.minutes} min read
                </span>
              </div>
              <h3 className="mt-5 text-[22px] leading-[1.15] tracking-[-0.02em] font-bold group-hover:text-[#C94400] transition-colors">
                {a.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-[#626262]">{a.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                Read guide
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
