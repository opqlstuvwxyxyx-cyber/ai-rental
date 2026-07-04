import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, getMaterialsByCategory } from "@/lib/mock-data";

export default function CategoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="page-header">
        <p className="label-caps mb-1">Categories</p>
        <h1 className="page-title">カテゴリから探す</h1>
        <p className="page-subtitle">ジャンル別に動画広告素材を探せます</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const items = getMaterialsByCategory(c);
          const thumb = items[0]?.thumbnailUrl;
          return (
            <Link
              key={c}
              href={`/materials?category=${encodeURIComponent(c)}`}
              className="surface-card group overflow-hidden"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-hover">
                {thumb ? (
                  <Image
                    src={thumb}
                    alt={c}
                    fill
                    className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-90"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted/30">{c}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h2 className="font-display text-lg text-cream">{c}</h2>
                  <p className="text-sm text-muted">{items.length}件の素材</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 text-sm text-gold">
                <span>素材を見る</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
