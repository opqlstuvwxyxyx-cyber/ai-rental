"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ defaultValue = "", placeholder = "キーワードで素材を検索...", variant = "default" }: { defaultValue?: string; placeholder?: string; variant?: "default" | "hero" }) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();
  const isHero = variant === "hero";

  return (
    <form onSubmit={(e) => { e.preventDefault(); const p = new URLSearchParams(); if (query.trim()) p.set("q", query.trim()); router.push(`/materials?${p}`); }} className="relative w-full">
      <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isHero ? "text-gold/60" : "text-muted"}`} />
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder}
        className={isHero ? "w-full rounded-xl border border-gold/20 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-cream outline-none focus:border-gold/50" : "input-field pl-11"} />
    </form>
  );
}
