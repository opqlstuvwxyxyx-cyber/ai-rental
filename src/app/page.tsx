import Link from "next/link";
import { ArrowRight, Package, RefreshCw, Search, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { MaterialCard } from "@/components/MaterialCard";
import { MATERIALS } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(201,169,98,0.15)_0%,_transparent_65%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5">
            <Sparkles size={12} className="text-gold" />
            <span className="label-caps !text-[0.6rem]">Local Preview</span>
          </div>
          <h1 className="font-display mb-6 text-4xl leading-tight text-cream sm:text-6xl">
            動画広告素材は<br /><span className="bg-gradient-to-r from-gold-light to-gold bg-clip-text text-transparent">借りる</span>時代へ
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-sm text-muted sm:text-base">
            購入のリスクなく、レンタル枠で自由にクリエイティブをテスト。返却すればすぐに新しい素材をレンタルできます。
          </p>
          <div className="mx-auto mb-8 max-w-lg"><SearchBar variant="hero" /></div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/materials" className="btn-primary">素材を探す <ArrowRight size={15} /></Link>
            <Link href="/plan" className="btn-ghost">プランを見る</Link>
          </div>
        </div>
      </section>
      <div className="gold-line mx-auto max-w-7xl" />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center font-display text-2xl text-cream">3ステップで始められる</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {[{ icon: Search, t: "素材を探す", d: "カテゴリやキーワードから探します" }, { icon: Package, t: "レンタルする", d: "契約枠内で素材をレンタル" }, { icon: RefreshCw, t: "返却して入れ替え", d: "枠が空いて新しい素材を試せます" }].map(({ icon: Icon, t, d }) => (
            <div key={t} className="surface-card p-7">
              <Icon className="mb-4 text-gold" size={20} />
              <h3 className="mb-2 font-medium text-cream">{t}</h3>
              <p className="text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface-raised py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-xl text-cream">新着素材</h2>
            <Link href="/materials" className="text-xs text-gold">VIEW ALL →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {MATERIALS.slice(0, 8).map((m) => <MaterialCard key={m.id} material={m} />)}
          </div>
        </div>
      </section>
    </>
  );
}
