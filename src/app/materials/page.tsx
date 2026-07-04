"use client";

import { useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { MaterialCard } from "@/components/MaterialCard";
import { SearchBar } from "@/components/SearchBar";
import { PageSkeleton } from "@/components/Skeleton";
import { MATERIALS, CATEGORIES } from "@/lib/mock-data";
import { Category } from "@/types";

function Content() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  const category = sp.get("category") as Category | null;

  const filtered = useMemo(() => MATERIALS.filter((m) => {
    const mq = !q || m.title.includes(q) || m.description.includes(q) || m.tags.some((t) => t.includes(q));
    const mc = !category || m.category === category;
    return mq && mc;
  }), [q, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="page-header">
        <p className="label-caps mb-1">Library</p>
        <h1 className="page-title">素材一覧</h1>
        <p className="page-subtitle">{filtered.length}件の素材{category ? `（${category}）` : ""}</p>
      </div>
      <div className="mb-6"><SearchBar defaultValue={q} /></div>
      <div className="mb-8 flex flex-wrap gap-2">
        <Link href="/materials" className={`chip ${!category ? "chip-active" : ""}`}>すべて</Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/materials?category=${encodeURIComponent(c)}`}
            className={`chip ${category === c ? "chip-active" : ""}`}
          >
            {c}
          </Link>
        ))}
      </div>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((m) => <MaterialCard key={m.id} material={m} />)}
        </div>
      ) : (
        <div className="surface-card flex flex-col items-center py-20 text-center">
          <SearchX size={36} className="mb-4 text-muted/50" />
          <p className="mb-2 font-medium text-cream">該当する素材がありません</p>
          <p className="mb-6 text-sm text-muted">キーワードやカテゴリを変えてお試しください</p>
          <Link href="/materials" className="btn-ghost">条件をクリア</Link>
        </div>
      )}
    </div>
  );
}

export default function MaterialsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6"><PageSkeleton count={10} /></div>}>
      <Content />
    </Suspense>
  );
}
