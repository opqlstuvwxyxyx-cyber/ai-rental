"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Package, RotateCcw } from "lucide-react";
import { MATERIALS } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

export default function RentalPage() {
  const { rentals, returnMaterial, rentalSlots, availableSlots, isLoggedIn } = useApp();
  const items = rentals.map((r) => ({ rental: r, material: MATERIALS.find((m) => m.id === r.materialId) })).filter((i) => i.material);

  if (!isLoggedIn) return <div className="py-20 text-center"><p className="mb-6 text-muted">ログインが必要です</p><Link href="/auth/login" className="btn-primary">ログイン</Link></div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="page-title mb-2">レンタル中</h1>
      <p className="page-subtitle mb-6">{rentals.length}件 / 残り{availableSlots}枠（契約{rentalSlots}枠）</p>
      {items.length === 0 ? (
        <div className="surface-card py-20 text-center"><Link href="/materials" className="btn-primary">素材を探す</Link></div>
      ) : (
        <div className="space-y-3">{items.map(({ rental, material }) => (
          <div key={rental.materialId} className="surface-card flex gap-4 p-4 sm:items-center">
            <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg">{material && <Image src={material.thumbnailUrl} alt="" fill className="object-cover" unoptimized />}</div>
            <div className="flex-1 min-w-0"><p className="text-xs text-gold">{material?.category}</p><h3 className="truncate text-cream">{material?.title}</h3></div>
            <div className="flex gap-2"><button className="btn-primary !py-2 !text-xs"><Download size={13} />DL</button><button onClick={() => returnMaterial(rental.materialId)} className="btn-ghost !py-2 !text-xs"><RotateCcw size={13} />返却</button></div>
          </div>
        ))}</div>
      )}
    </div>
  );
}
