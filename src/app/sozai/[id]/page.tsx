"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Download, Heart, Package, RotateCcw, Tag } from "lucide-react";
import { getMaterialById, MATERIALS } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/components/Toast";
import { Modal } from "@/components/Modal";
import { MaterialCard } from "@/components/MaterialCard";
import { downloadMaterial } from "@/lib/download";

export default function DetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const material = getMaterialById(id);
  const { isFavorite, toggleFavorite, isRented, rentMaterial, returnMaterial, isLoggedIn, availableSlots } = useApp();
  const { toast } = useToast();
  const [modal, setModal] = useState<"rent" | "return" | "login" | "slot-full" | null>(null);

  if (!material) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <p className="mb-2 font-medium text-cream">素材が見つかりません</p>
        <p className="mb-6 text-sm text-muted">URLが間違っているか、素材が削除された可能性があります</p>
        <Link href="/materials" className="btn-primary">素材一覧へ</Link>
      </div>
    );
  }

  const favorited = isFavorite(material.id);
  const rented = isRented(material.id);
  const related = MATERIALS.filter((m) => m.category === material.category && m.id !== material.id).slice(0, 4);

  const handleRent = () => {
    if (!isLoggedIn) { setModal("login"); return; }
    if (availableSlots <= 0) { setModal("slot-full"); return; }
    if (rentMaterial(material.id)) setModal("rent");
  };

  const handleDownload = () => {
    downloadMaterial(material.videoUrl, material.id);
    toast("ダウンロードを開始しました");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <button type="button" onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-sm text-muted hover:text-cream">
        <ArrowLeft size={14} />戻る
      </button>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-black shadow-2xl">
          <video src={material.videoUrl} poster={material.thumbnailUrl} controls playsInline className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="label-caps mb-3 inline-block w-fit rounded-full border border-gold/20 bg-gold/5 px-3 py-1">{material.category}</span>
          <h1 className="font-display mb-4 text-3xl leading-tight text-cream sm:text-4xl">{material.title}</h1>
          <p className="mb-6 text-sm leading-relaxed text-muted">{material.description}</p>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="badge text-cream/80"><Clock size={10} />{material.duration}秒</span>
            <span className="badge text-cream/80">{material.aspectRatio}</span>
            {rented && <span className="badge border-gold/30 text-gold">レンタル中</span>}
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {material.tags.map((t) => (
              <span key={t} className="rounded-full border border-border bg-white/3 px-3 py-1 text-xs text-muted">
                <Tag size={10} className="mr-1 inline" />{t}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3 sm:flex-row">
            {rented ? (
              <>
                <button type="button" onClick={handleDownload} className="btn-primary flex-1">
                  <Download size={15} />ダウンロード
                </button>
                <button
                  type="button"
                  onClick={() => { returnMaterial(material.id); setModal("return"); }}
                  className="btn-ghost flex-1"
                >
                  <RotateCcw size={15} />返却する
                </button>
              </>
            ) : (
              <button type="button" onClick={handleRent} className="btn-primary flex-1">
                <Package size={15} />レンタルする
              </button>
            )}
            <button
              type="button"
              onClick={() => { toggleFavorite(material.id); toast(favorited ? "お気に入りから削除しました" : "お気に入りに追加しました"); }}
              className={`btn-ghost flex-1 ${favorited ? "!border-gold/30 !text-gold" : ""}`}
            >
              <Heart size={15} className={favorited ? "fill-gold" : ""} />
              {favorited ? "お気に入り済" : "お気に入り"}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="font-display mb-6 text-xl text-cream">関連素材</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((m) => <MaterialCard key={m.id} material={m} />)}
          </div>
        </section>
      )}

      <Modal open={modal === "rent"} onClose={() => setModal(null)} title="レンタル完了">
        <p className="mb-6 text-sm leading-relaxed text-muted">レンタルが完了しました。ダウンロードして広告テストを始められます。</p>
        <button type="button" onClick={() => setModal(null)} className="btn-primary w-full">OK</button>
      </Modal>
      <Modal open={modal === "return"} onClose={() => setModal(null)} title="返却完了">
        <p className="mb-6 text-sm text-muted">返却しました。レンタル枠が1つ空きました。</p>
        <button type="button" onClick={() => setModal(null)} className="btn-primary w-full">OK</button>
      </Modal>
      <Modal open={modal === "slot-full"} onClose={() => setModal(null)} title="枠がいっぱいです">
        <p className="mb-6 text-sm text-muted">レンタル枠の上限に達しています。不要な素材を返却するか、プランをアップグレードしてください。</p>
        <div className="flex gap-3">
          <Link href="/rental" className="btn-primary flex-1 text-center">レンタル中を見る</Link>
          <Link href="/settings" className="btn-ghost flex-1 text-center">プラン変更</Link>
        </div>
      </Modal>
      <Modal open={modal === "login"} onClose={() => setModal(null)} title="ログインが必要です">
        <p className="mb-6 text-sm text-muted">レンタルにはログインが必要です。</p>
        <div className="flex gap-3">
          <Link href="/auth/login" className="btn-primary flex-1 text-center">ログイン</Link>
          <Link href="/auth/register" className="btn-ghost flex-1 text-center">新規登録</Link>
        </div>
      </Modal>
    </div>
  );
}
