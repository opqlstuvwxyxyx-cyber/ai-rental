"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Clock } from "lucide-react";
import { Material } from "@/types";
import { useApp } from "@/context/AppContext";

export function MaterialCard({ material }: { material: Material }) {
  const { isFavorite, toggleFavorite, isRented } = useApp();
  const favorited = isFavorite(material.id);
  const rented = isRented(material.id);

  return (
    <div className="surface-card group relative overflow-hidden">
      <Link href={`/sozai/${material.id}`} className="block">
        <div className="relative aspect-[9/16] overflow-hidden bg-surface">
          <Image src={material.thumbnailUrl} alt={material.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="20vw" unoptimized />
          {rented && <span className="absolute left-2.5 top-2.5 rounded-full border border-gold/30 bg-black/60 px-2 py-0.5 text-[0.65rem] text-gold">RENTING</span>}
          <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md bg-black/70 px-2 py-0.5 text-[0.65rem] text-cream/80"><Clock size={9} />{material.duration}s</span>
        </div>
        <div className="p-3.5">
          <p className="label-caps mb-1.5 !text-[0.6rem]">{material.category}</p>
          <h3 className="line-clamp-2 text-sm font-medium text-cream">{material.title}</h3>
        </div>
      </Link>
      <button onClick={(e) => { e.preventDefault(); toggleFavorite(material.id); }} className="absolute right-2.5 top-2.5 rounded-full border border-white/10 bg-black/50 p-1.5">
        <Heart size={14} className={favorited ? "fill-gold text-gold" : "text-cream/60"} />
      </button>
    </div>
  );
}
