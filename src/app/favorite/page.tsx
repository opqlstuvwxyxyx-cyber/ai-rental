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
      <h1 className="page-title mb-6">お気に入り ({materials.length})</h1>
      {materials.length === 0 ? (
        <div className="surface-card py-20 text-center"><p className="mb-6 text-muted">まだありません</p><Link href="/materials" className="btn-primary">素材を探す</Link></div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{materials.map((m) => <MaterialCard key={m.id} material={m} />)}</div>
      )}
    </div>
  );
}
