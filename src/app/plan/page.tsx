import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";
import { RENTAL_PLANS } from "@/lib/mock-data";

const FAQ = [
  { q: "レンタル枠とは？", a: "同時に借りられる素材の数です。返却すれば枠が空き、別の素材をレンタルできます。" },
  { q: "プラン変更はいつでもできますか？", a: "はい。アカウント設定からいつでも変更できます（決済連携後は課金ルールが適用されます）。" },
  { q: "ダウンロードした素材の利用範囲は？", a: "レンタル期間中の広告テスト利用を想定しています。詳細は利用規約をご確認ください。" },
];

export default function PlanPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-12 text-center">
        <p className="label-caps mb-2">Pricing</p>
        <h1 className="font-display mb-4 text-3xl text-cream sm:text-4xl">料金プラン</h1>
        <p className="mx-auto max-w-xl text-sm text-muted sm:text-base">
          チームの規模とテスト量に合わせて選べる3つのプラン。すべてのプランで全カテゴリの素材にアクセスできます。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {RENTAL_PLANS.map((plan) => (
          <div key={plan.id} className={`relative p-8 ${plan.popular ? "surface-card-gold scale-[1.02]" : "surface-card"}`}>
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-gold/30 bg-surface px-4 py-1 text-xs font-medium text-gold">
                人気No.1
              </span>
            )}
            <h2 className="font-display text-2xl text-cream">{plan.name}</h2>
            <p className="mt-2 text-sm text-muted">{plan.description}</p>
            <p className="my-6 font-display text-4xl text-gold">
              ¥{plan.price.toLocaleString()}
              <span className="text-sm font-normal text-muted">/月</span>
            </p>
            <ul className="mb-8 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-muted">
                  <Check size={14} className="mt-0.5 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={`/auth/register?plan=${plan.id}`}
              className={`block w-full text-center ${plan.popular ? "btn-primary" : "btn-ghost"}`}
            >
              このプランで始める
            </Link>
          </div>
        ))}
      </div>

      <section className="mt-20">
        <div className="mb-8 flex items-center gap-2">
          <HelpCircle size={20} className="text-gold" />
          <h2 className="font-display text-xl text-cream">よくある質問</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="surface-card p-6">
              <h3 className="mb-2 font-medium text-cream">{q}</h3>
              <p className="text-sm leading-relaxed text-muted">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
