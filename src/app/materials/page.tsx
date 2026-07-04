"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MaterialCard } from "@/components/MaterialCard";
import { SearchBar } from "@/components/SearchBar";
import { MATERIALS, CATEGORIES } from "@/lib/mock-data";
import { Category } from "@/types";

function Content() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  const category = sp.get("category") as Category | null;
  const filtered = useMemo(() => MATERIALS.filter((m) => {
    const mq = !q || m.title.includes(q) || m.description.includes(q);
    const mc = !category || m.category === category;
    return mq && mc;
  }), [q, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="page-header">
        <p className="label-caps mb-1">Library</p>
        <h1 className="page-title">素材一覧</h1>
        <p className="page-subtitle">{filtered.length}件</p>
      </div>
      <div className="mb-6"><SearchBar defaultValue={q} /></div>
      <div className="mb-8 flex flex-wrap gap-2">
        <a href="/materials" className={`rounded-full px-3.5 py-1.5 text-xs ${!category ? "border border-gold/30 bg-gold/10 text-gold" : "border border-border text-muted"}`}>すべて</a>
        {CATEGORIES.map((c) => (
          <a key={c} href={`/materials?category=${encodeURIComponent(c)}`} className={`rounded-full px-3.5 py-1.5 text-xs ${category === c ? "border border-gold/30 bg-gold/10 text-gold" : "border border-border text-muted"}`}>{c}</a>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((m) => <MaterialCard key={m.id} material={m} />)}
      </div>
    </div>
  );
}

export default function MaterialsPage() {
  return <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>}><Content /></Suspense>;
}
