import Link from "next/link";
import { Check } from "lucide-react";
import { RENTAL_PLANS } from "@/lib/mock-data";

export default function PlanPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-12 text-center font-display text-3xl text-cream">料金プラン</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {RENTAL_PLANS.map((plan) => (
          <div key={plan.id} className={`p-7 ${plan.popular ? "surface-card-gold" : "surface-card"}`}>
            <h2 className="font-display text-xl text-cream">{plan.name}</h2>
            <p className="mt-2 text-sm text-muted">{plan.description}</p>
            <p className="my-6 font-display text-4xl text-gold">¥{plan.price.toLocaleString()}<span className="text-sm text-muted">/月</span></p>
            <ul className="mb-8 space-y-2">{plan.features.map((f) => <li key={f} className="flex gap-2 text-sm text-muted"><Check size={13} className="text-gold" />{f}</li>)}</ul>
            <Link href="/auth/register" className={plan.popular ? "btn-primary block text-center" : "btn-ghost block text-center"}>申し込む</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
