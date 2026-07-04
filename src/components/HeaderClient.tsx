"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, User, LogOut, Search, Heart, Package, LayoutGrid, CreditCard } from "lucide-react";
import { useApp } from "@/context/AppContext";

const NAV = [
  { href: "/materials", label: "素材一覧", icon: Search },
  { href: "/category", label: "カテゴリ", icon: LayoutGrid },
  { href: "/favorite", label: "お気に入り", icon: Heart },
  { href: "/rental", label: "レンタル中", icon: Package },
  { href: "/plan", label: "プラン", icon: CreditCard },
];

export function HeaderClient() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, logout, availableSlots, rentals } = useApp();

  return (
    <div className="flex items-center gap-4">
      <nav className="hidden items-center gap-0.5 md:flex">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium ${pathname === href ? "bg-gold/10 text-gold" : "text-muted hover:text-cream"}`}>
            <Icon size={14} strokeWidth={1.5} />{label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        {isLoggedIn && (
          <div className="hidden rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs sm:block">
            <span className="text-muted">残り枠 </span>
            <span className="font-semibold text-gold">{availableSlots}/{rentals.length + availableSlots}</span>
          </div>
        )}
        {isLoggedIn ? (
          <div className="hidden items-center gap-1 sm:flex">
            <Link href="/settings" className="flex items-center gap-1.5 px-3 py-2 text-xs text-muted hover:text-cream"><User size={14} />設定</Link>
            <button onClick={logout} className="flex items-center gap-1.5 px-3 py-2 text-xs text-muted hover:text-cream"><LogOut size={14} />ログアウト</button>
          </div>
        ) : (
          <div className="hidden items-center gap-2 sm:flex">
            <Link href="/auth/login" className="btn-ghost !py-2 !text-xs">ログイン</Link>
            <Link href="/auth/register" className="btn-primary !py-2 !text-xs">新規登録</Link>
          </div>
        )}
        <button className="rounded-lg p-2 text-muted md:hidden" onClick={() => setOpen(!open)} aria-label="メニュー">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        {open && (
          <div className="absolute left-0 right-0 top-16 border-b border-border bg-surface-raised p-4 md:hidden">
            {NAV.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-muted">{label}</Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
