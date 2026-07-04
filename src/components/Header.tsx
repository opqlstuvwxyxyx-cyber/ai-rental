import Link from "next/link";
import { HeaderClient } from "./HeaderClient";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-xl">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-xs font-semibold tracking-widest text-gold">AR</div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base tracking-widest text-cream">AI RENTAL</span>
            <span className="label-caps mt-0.5 !text-[0.55rem] !text-muted">Creative Library</span>
          </div>
        </Link>
        <HeaderClient />
      </div>
    </header>
  );
}
