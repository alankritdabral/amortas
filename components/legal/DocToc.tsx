"use client";

import { useEffect, useState } from "react";

type Item = { id: string; text: string };

/**
 * "On this page" navigation for long documents. Reads the <h2> headings inside
 * the element matching `target`, gives each an id, and highlights the section
 * currently in view. Renders nothing for documents with fewer than 3 sections.
 */
export function DocToc({ target = "#doc-body" }: { target?: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const root = document.querySelector(target);
    if (!root) return;
    const heads = Array.from(root.querySelectorAll<HTMLHeadingElement>("h2"));
    const found = heads.map((h, i) => {
      const text = (h.textContent ?? "").trim();
      if (!h.id) {
        h.id = `s-${i + 1}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40)}`;
      }
      return { id: h.id, text };
    });
    if (!found.length) return;
    // Deferred so state is not set synchronously inside the effect body.
    const raf = requestAnimationFrame(() => {
      setItems(found);
      setActive(found[0].id);
    });
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px" },
    );
    heads.forEach((h) => obs.observe(h));
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [target]);

  if (items.length < 3) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#626262]">On this page</p>
      <ol className="mt-3 space-y-0.5 border-l border-[#E7E2DD]">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "true" : undefined}
              className={`-ml-px block border-l-2 py-1.5 pl-4 leading-snug transition-colors ${
                active === it.id
                  ? "border-[#FD6C01] font-semibold text-[#252525]"
                  : "border-transparent text-[#626262] hover:text-[#252525]"
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
