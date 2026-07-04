"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className="flex items-center gap-4">
      <nav className="hidden items-center gap-0.5 lg:flex">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              pathname === href ? "bg-gold/10 text-gold" : "text-muted hover:bg-white/5 hover:text-cream"
            }`}
          >
            <Icon size={14} strokeWidth={1.5} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2 sm:gap-3">
        {isLoggedIn && (
          <div className="hidden rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs md:block">
            <span className="text-muted">残り枠 </span>
            <span className="font-semibold text-gold">{availableSlots}/{rentals.length + availableSlots}</span>
          </div>
        )}
        {isLoggedIn ? (
          <div className="hidden items-center gap-1 md:flex">
            <Link href="/settings" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-muted hover:text-cream">
              <User size={14} />設定
            </Link>
            <button type="button" onClick={logout} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-muted hover:text-cream">
              <LogOut size={14} />ログアウト
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/auth/login" className="btn-ghost !py-2 !px-4 !text-xs">ログイン</Link>
            <Link href="/auth/register" className="btn-primary !py-2 !px-4 !text-xs">新規登録</Link>
          </div>
        )}
        <button
          type="button"
          className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-cream lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <>
          <div className="fixed inset-0 top-16 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute left-0 right-0 top-full z-50 border-b border-border bg-surface-raised/98 backdrop-blur-xl lg:hidden">
            <nav className="mx-auto max-w-7xl space-y-1 p-4">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                    pathname === href ? "bg-gold/10 text-gold" : "text-muted hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
              <div className="gold-line my-3" />
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-2 text-xs text-muted">
                    残り枠 <span className="font-semibold text-gold">{availableSlots}/{rentals.length + availableSlots}</span>
                  </div>
                  <Link href="/settings" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted hover:bg-white/5">
                    <User size={16} />設定
                  </Link>
                  <button
                    type="button"
                    onClick={() => { logout(); setOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted hover:bg-white/5"
                  >
                    <LogOut size={16} />ログアウト
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-2 pt-2">
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="btn-ghost w-full text-center">ログイン</Link>
                  <Link href="/auth/register" onClick={() => setOpen(false)} className="btn-primary w-full text-center">新規登録</Link>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
