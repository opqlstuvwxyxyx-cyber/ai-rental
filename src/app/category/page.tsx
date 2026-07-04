import Link from "next/link";
import { CATEGORIES, getMaterialsByCategory } from "@/lib/mock-data";

export default function CategoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="page-header"><h1 className="page-title">カテゴリから探す</h1></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <Link key={c} href={`/materials?category=${encodeURIComponent(c)}`} className="surface-card flex items-center justify-between p-6">
            <div><h2 className="font-display text-lg text-cream">{c}</h2><p className="text-sm text-muted">{getMaterialsByCategory(c).length}件</p></div>
            <span className="text-gold">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
