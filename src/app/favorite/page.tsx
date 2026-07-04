"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { MaterialCard } from "@/components/MaterialCard";
import { MATERIALS } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

export default function FavoritePage() {
  const { favorites } = useApp();
  const materials = MATERIALS.filter((m) => favorites.includes(m.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="page-header">
        <p className="label-caps mb-1">Favorites</p>
        <h1 className="page-title">お気に入り</h1>
        <p className="page-subtitle">{materials.length}件保存中</p>
      </div>
      {materials.length === 0 ? (
        <div className="surface-card flex flex-col items-center py-20 text-center">
          <Heart size={36} className="mb-4 text-gold/30" />
          <p className="mb-2 font-medium text-cream">お気に入りはまだありません</p>
          <p className="mb-6 text-sm text-muted">気になる素材のハートマークを押して保存できます</p>
          <Link href="/materials" className="btn-primary">素材を探す</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {materials.map((m) => <MaterialCard key={m.id} material={m} />)}
        </div>
      )}
    </div>
  );
}
