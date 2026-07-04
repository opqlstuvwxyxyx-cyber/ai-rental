import Link from "next/link";
import { ArrowRight, CheckCircle2, Package, Play, RefreshCw, Search, Sparkles, Zap } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { MaterialCard } from "@/components/MaterialCard";
import { MATERIALS, CATEGORIES } from "@/lib/mock-data";

const STEPS = [
  { icon: Search, title: "素材を探す", desc: "カテゴリやキーワードから、広告に使える縦型動画を検索" },
  { icon: Package, title: "レンタルする", desc: "契約プランの枠内で、気になる素材をすぐに借りられる" },
  { icon: RefreshCw, title: "返却して入れ替え", desc: "テストが終わったら返却。枠が空いて次の素材を試せる" },
];

const FEATURES = [
  "購入前に広告テストができる",
  "返却後すぐ別素材をレンタル",
  "全カテゴリの素材にアクセス",
  "縦型UGC動画に特化",
];

export default function HomePage() {
  const featured = MATERIALS.slice(0, 8);

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,169,98,0.12)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-2">
              <Sparkles size={14} className="text-gold" />
              <span className="text-xs font-medium text-gold">動画広告素材レンタルサービス</span>
            </div>
          </div>
          <h1 className="font-display mb-6 text-center text-4xl leading-[1.15] text-cream sm:text-6xl">
            動画広告素材は
            <br />
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-dim bg-clip-text text-transparent">借りる</span>
            時代へ
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
            高額な素材購入のリスクなく、レンタル枠で自由にクリエイティブをテスト。
            成果が出なければ返却、次の素材へ。広告運用のスピードと柔軟性を最大化します。
          </p>
          <div className="mx-auto mb-8 max-w-xl"><SearchBar variant="hero" /></div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/materials" className="btn-primary">素材を探す <ArrowRight size={15} /></Link>
            <Link href="/plan" className="btn-ghost">料金プランを見る</Link>
          </div>
          <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-muted">
                <CheckCircle2 size={13} className="shrink-0 text-gold" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="gold-line mx-auto max-w-7xl" />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="label-caps mb-2">How it works</p>
          <h2 className="font-display text-2xl text-cream sm:text-3xl">3ステップで始められる</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="surface-card relative p-8">
              <span className="absolute right-5 top-5 font-display text-3xl text-gold/15">{String(i + 1).padStart(2, "0")}</span>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/5">
                <Icon className="text-gold" size={20} />
              </div>
              <h3 className="mb-2 text-lg font-medium text-cream">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface-raised/60 section-pad">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-caps mb-1">Categories</p>
              <h2 className="font-display text-xl text-cream sm:text-2xl">カテゴリから探す</h2>
            </div>
            <Link href="/category" className="text-sm text-gold hover:underline">すべて見る →</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`/materials?category=${encodeURIComponent(c)}`}
                className="chip hover:border-gold/30"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-caps mb-1">Featured</p>
            <h2 className="font-display text-xl text-cream sm:text-2xl">おすすめ素材</h2>
          </div>
          <Link href="/materials" className="flex items-center gap-1 text-sm text-gold hover:underline">
            すべて見る <ArrowRight size={14} />
          </Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {featured.map((m) => <MaterialCard key={m.id} material={m} />)}
          </div>
        ) : (
          <div className="surface-card py-16 text-center">
            <Play size={32} className="mx-auto mb-4 text-gold/50" />
            <p className="text-muted">素材を準備中です</p>
            <Link href="/sozai-request" className="btn-ghost mt-4 inline-flex">素材をリクエスト</Link>
          </div>
        )}
      </section>

      <section className="border-t border-border bg-gradient-to-b from-gold/5 to-transparent section-pad">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Zap size={28} className="mx-auto mb-4 text-gold" />
          <h2 className="font-display mb-4 text-2xl text-cream sm:text-3xl">まずはプランを選んで始めましょう</h2>
          <p className="mb-8 text-sm text-muted sm:text-base">
            スターターからエンタープライズまで、チーム規模に合わせたプランをご用意しています。
          </p>
          <Link href="/plan" className="btn-primary">料金プランを見る <ArrowRight size={15} /></Link>
        </div>
      </section>
    </>
  );
}
