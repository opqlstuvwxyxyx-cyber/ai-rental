"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Heart, Play } from "lucide-react";
import { Material } from "@/types";
import { useApp } from "@/context/AppContext";

export function MaterialCard({ material }: { material: Material }) {
  const { isFavorite, toggleFavorite, isRented } = useApp();
  const favorited = isFavorite(material.id);
  const rented = isRented(material.id);

  return (
    <div className="surface-card group relative overflow-hidden">
      <Link href={`/sozai/${material.id}`} className="block">
        <div className="relative aspect-[9/16] overflow-hidden bg-surface-hover">
          <Image
            src={material.thumbnailUrl}
            alt={material.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 20vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/90 text-surface shadow-lg">
              <Play size={18} className="ml-0.5" fill="currentColor" />
            </div>
          </div>
          {rented && (
            <span className="badge absolute left-2.5 top-2.5 border-gold/30 text-gold">レンタル中</span>
          )}
          <span className="badge absolute bottom-2.5 right-2.5 text-cream/90">
            <Clock size={9} />{material.duration}秒
          </span>
        </div>
        <div className="p-4">
          <p className="label-caps mb-1.5 !text-[0.6rem]">{material.category}</p>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-cream">{material.title}</h3>
        </div>
      </Link>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); toggleFavorite(material.id); }}
        className="absolute right-2.5 top-2.5 rounded-full border border-white/10 bg-black/55 p-2 backdrop-blur-sm transition-colors hover:bg-black/75"
        aria-label={favorited ? "お気に入りから削除" : "お気に入りに追加"}
      >
        <Heart size={14} className={favorited ? "fill-gold text-gold" : "text-cream/70"} />
      </button>
    </div>
  );
}
