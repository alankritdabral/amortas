import Link from "next/link";
import { ArrowRight, Check, X, ClipboardList } from "lucide-react";
import { articles } from "@/content/articles";
import { extras } from "@/lib/pageExtras";
import type { PageKey } from "@/lib/pageContent";
import { readingMinutes, topicOf } from "@/lib/articleMeta";

/** "Good fit / not a fit" columns plus a document checklist. */
export function FitAndDocs({ page }: { page: PageKey }) {
  const e = extras[page];
  if (!e) return null;
  return (
    <section className="bg-white text-[#252525]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
        <h2 className="text-[36px] sm:text-[48px] leading-[1.02] tracking-[-0.04em] font-bold max-w-3xl">{e.fitTitle}</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="rounded-lg border border-[#E7E2DD] p-6 md:p-8">
            <p className="text-sm font-semibold text-[#C94400]">Good signs</p>
            <ul className="mt-5 space-y-4">
              {e.goodFit.map((t) => (
                <li key={t} className="flex gap-3 leading-snug">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FFE4CC]"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-[#E7E2DD] p-6 md:p-8">
            <p className="text-sm font-semibold text-[#626262]">Think twice if</p>
            <ul className="mt-5 space-y-4">
              {e.notFit.map((t) => (
                <li key={t} className="flex gap-3 leading-snug">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F4F0EC]"><X className="h-3.5 w-3.5" aria-hidden="true" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-[#252525] p-6 text-white md:p-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#FFD1A3]"><ClipboardList className="h-4 w-4" aria-hidden="true" /> {e.docsTitle}</p>
            <ul className="mt-5 space-y-3">
              {e.docs.map((t) => (
                <li key={t} className="flex gap-3 leading-snug"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FD6C01]" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Related reading plus cross-links to sibling products. */
export function GuidesAndAlso({ page }: { page: PageKey }) {
  const e = extras[page];
  if (!e) return null;
  const guides = e.guides.map((s) => articles.find((a) => a.slug === s)).filter((a) => !!a);
  return (
    <section className="section-tint text-[#252525]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] grid gap-14">
        <div>
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">Read before you decide.</h2>
            <Link href="/learning-center" className="hidden shrink-0 font-semibold underline underline-offset-4 hover:text-[#C94400] sm:block">All guides</Link>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {guides.map((a) => (
              <li key={a.slug}>
                <Link href={`/learning-center/${a.slug}`} className="group flex h-full flex-col rounded-lg border border-[#E7E2DD] bg-white p-6 transition-colors hover:border-[#252525]">
                  <span className="text-sm font-semibold text-[#626262]">{topicOf(a)} · {readingMinutes(a)} min read</span>
                  <span className="mt-3 text-xl leading-tight tracking-[-0.01em] font-bold group-hover:text-[#C94400] transition-colors">{a.title}</span>
                  <span className="mt-3 flex-1 leading-relaxed text-[#626262]">{a.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[28px] md:text-[32px] leading-tight tracking-[-0.02em] font-bold">You might also look at</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {e.also.map((x) => (
              <li key={x.href}>
                <Link href={x.href} className="group flex h-full items-center justify-between gap-4 rounded-lg bg-[#FFE4CC] p-6 transition-colors hover:bg-[#FFD1A3]">
                  <span><span className="block text-lg font-bold">{x.title}</span><span className="mt-1 block text-[#444140]">{x.text}</span></span>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
