"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Package, RotateCcw } from "lucide-react";
import { MATERIALS } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/components/Toast";
import { downloadMaterial } from "@/lib/download";

export default function RentalPage() {
  const { rentals, returnMaterial, rentalSlots, availableSlots, isLoggedIn } = useApp();
  const { toast } = useToast();
  const items = rentals
    .map((r) => ({ rental: r, material: MATERIALS.find((m) => m.id === r.materialId) }))
    .filter((i) => i.material);

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <p className="mb-2 font-medium text-cream">ログインが必要です</p>
        <p className="mb-6 text-sm text-muted">レンタル中の素材を確認するにはログインしてください</p>
        <Link href="/auth/login" className="btn-primary">ログイン</Link>
      </div>
    );
  }

  const usagePercent = rentalSlots > 0 ? Math.round((rentals.length / rentalSlots) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="page-header">
        <p className="label-caps mb-1">My Rentals</p>
        <h1 className="page-title">レンタル中の素材</h1>
        <p className="page-subtitle">{rentals.length}件レンタル中 · 残り{availableSlots}枠（契約{rentalSlots}枠）</p>
      </div>

      <div className="surface-card mb-8 p-5">
        <div className="mb-2 flex justify-between text-xs text-muted">
          <span>枠の使用状況</span>
          <span>{rentals.length} / {rentalSlots}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-gradient-to-r from-gold-dim to-gold transition-all" style={{ width: `${usagePercent}%` }} />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="surface-card flex flex-col items-center py-20 text-center">
          <Package size={36} className="mb-4 text-gold/40" />
          <p className="mb-2 font-medium text-cream">レンタル中の素材はありません</p>
          <p className="mb-6 text-sm text-muted">素材一覧から気になる動画をレンタルしましょう</p>
          <Link href="/materials" className="btn-primary">素材を探す</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(({ rental, material }) => (
            <div key={rental.materialId} className="surface-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <Link href={`/sozai/${material!.id}`} className="flex min-w-0 flex-1 items-center gap-4">
                <div className="relative h-28 w-[4.5rem] shrink-0 overflow-hidden rounded-xl">
                  <Image src={material!.thumbnailUrl} alt={material!.title} fill className="object-cover" unoptimized />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gold">{material?.category}</p>
                  <h3 className="truncate font-medium text-cream">{material?.title}</h3>
                  <p className="mt-1 text-xs text-muted">レンタル日: {new Date(rental.rentedAt).toLocaleDateString("ja-JP")}</p>
                </div>
              </Link>
              <div className="flex shrink-0 gap-2 sm:flex-col lg:flex-row">
                <button
                  type="button"
                  onClick={() => { downloadMaterial(material!.videoUrl, material!.id); toast("ダウンロードを開始しました"); }}
                  className="btn-primary flex-1 !py-2.5 !text-xs sm:flex-none"
                >
                  <Download size={14} />ダウンロード
                </button>
                <button
                  type="button"
                  onClick={() => { returnMaterial(rental.materialId); toast("返却しました"); }}
                  className="btn-ghost flex-1 !py-2.5 !text-xs sm:flex-none"
                >
                  <RotateCcw size={14} />返却
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
