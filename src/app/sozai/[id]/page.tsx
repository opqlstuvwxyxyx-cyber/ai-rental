"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Heart, Package, RotateCcw, Tag } from "lucide-react";
import { getMaterialById } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { Modal } from "@/components/Modal";

export default function DetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const material = getMaterialById(id);
  const { isFavorite, toggleFavorite, isRented, rentMaterial, returnMaterial, isLoggedIn, availableSlots } = useApp();
  const [modal, setModal] = useState<"rent" | "return" | "login" | null>(null);

  if (!material) return <div className="py-16 text-center text-muted">素材が見つかりません<Link href="/materials" className="mt-4 block text-gold">一覧へ</Link></div>;

  const favorited = isFavorite(material.id);
  const rented = isRented(material.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-xs text-muted"><ArrowLeft size={14} />BACK</button>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-black">
          <video src={material.videoUrl} poster={material.thumbnailUrl} controls className="h-full w-full object-contain" />
        </div>
        <div>
          <span className="label-caps mb-3 inline-block">{material.category}</span>
          <h1 className="font-display mb-4 text-3xl text-cream">{material.title}</h1>
          <p className="mb-8 text-sm text-muted">{material.description}</p>
          <div className="mb-8 flex flex-wrap gap-2">{material.tags.map((t) => <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted"><Tag size={10} className="inline" /> {t}</span>)}</div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {rented ? (
              <><button className="btn-primary flex-1"><Download size={15} />ダウンロード</button>
              <button onClick={() => { returnMaterial(material.id); setModal("return"); }} className="btn-ghost flex-1"><RotateCcw size={15} />返却する</button></>
            ) : (
              <button onClick={() => { if (!isLoggedIn) { setModal("login"); return; } if (availableSlots <= 0) { alert("枠がいっぱいです"); return; } if (rentMaterial(material.id)) setModal("rent"); }} className="btn-primary flex-1"><Package size={15} />レンタルする</button>
            )}
            <button onClick={() => toggleFavorite(material.id)} className={`btn-ghost flex-1 ${favorited ? "!text-gold" : ""}`}><Heart size={15} className={favorited ? "fill-gold" : ""} />{favorited ? "お気に入り済" : "お気に入り"}</button>
          </div>
        </div>
      </div>
      <Modal open={modal === "rent"} onClose={() => setModal(null)} title="レンタル完了"><p className="mb-6 text-sm text-muted">レンタルしました。</p><button onClick={() => setModal(null)} className="btn-primary w-full">OK</button></Modal>
      <Modal open={modal === "return"} onClose={() => setModal(null)} title="返却完了"><p className="mb-6 text-sm text-muted">返却しました。枠が空きました。</p><button onClick={() => setModal(null)} className="btn-primary w-full">OK</button></Modal>
      <Modal open={modal === "login"} onClose={() => setModal(null)} title="ログインが必要"><div className="flex gap-3"><Link href="/auth/login" className="btn-primary flex-1 text-center">ログイン</Link><Link href="/auth/register" className="btn-ghost flex-1 text-center">登録</Link></div></Modal>
    </div>
  );
}
