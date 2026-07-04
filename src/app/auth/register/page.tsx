"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { RENTAL_PLANS } from "@/lib/mock-data";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const { register, changePlan } = useApp();
  const router = useRouter();
  const sp = useSearchParams();
  const planId = sp.get("plan");
  const selectedPlan = RENTAL_PLANS.find((p) => p.id === planId);

  return (
    <div className="glass-card w-full max-w-md p-8 sm:p-10">
      <div className="mb-8 text-center">
        <p className="label-caps mb-2">Get started</p>
        <h1 className="font-display text-2xl text-cream">新規登録</h1>
        {selectedPlan && (
          <p className="mt-2 text-sm text-gold">{selectedPlan.name}プランで登録</p>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (password !== confirm) { setError("パスワードが一致しません"); return; }
          const r = register(name, email, password);
          if (r.ok) {
            if (planId) changePlan(planId);
            router.push("/materials");
          } else setError(r.error ?? "登録に失敗しました");
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs text-muted">お名前</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs text-muted">メールアドレス</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs text-muted">パスワード（8文字以上）</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" minLength={8} autoComplete="new-password" required />
        </div>
        <div>
          <label htmlFor="confirm" className="mb-1.5 block text-xs text-muted">パスワード（確認）</label>
          <input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="input-field" minLength={8} autoComplete="new-password" required />
        </div>
        <p className="text-xs text-muted">
          登録により<Link href="/legal/terms" className="text-gold hover:underline">利用規約</Link>に同意したものとみなします。
        </p>
        {error && <p className="text-xs text-red-400" role="alert">{error}</p>}
        <button type="submit" className="btn-primary w-full">登録する</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        すでにアカウントをお持ちの方は <Link href="/auth/login" className="text-gold hover:underline">ログイン</Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="skeleton h-96 w-full max-w-md rounded-2xl" />}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
