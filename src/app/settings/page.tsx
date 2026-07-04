"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  CreditCard,
  Heart,
  LogOut,
  Package,
  User,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { RENTAL_PLANS } from "@/lib/mock-data";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card p-6 sm:p-7">
      <h2 className="mb-1 font-medium text-cream">{title}</h2>
      {description && <p className="mb-5 text-sm text-muted">{description}</p>}
      {!description && <div className="mb-5" />}
      {children}
    </section>
  );
}

function Message({ text, type }: { text: string; type: "ok" | "error" }) {
  return (
    <p className={`text-xs ${type === "ok" ? "text-gold" : "text-red-400"}`}>{text}</p>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const {
    isLoggedIn,
    userEmail,
    userName,
    isDemoAccount,
    rentals,
    favorites,
    rentalSlots,
    availableSlots,
    planId,
    emailNotifications,
    updateName,
    updatePassword,
    changePlan,
    setEmailNotifications,
    logout,
  } = useApp();

  const [name, setName] = useState("");
  const [nameMsg, setNameMsg] = useState<{ text: string; type: "ok" | "error" } | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; type: "ok" | "error" } | null>(null);
  const [planMsg, setPlanMsg] = useState<{ text: string; type: "ok" | "error" } | null>(null);

  useEffect(() => {
    if (userName) setName(userName);
  }, [userName]);

  const currentPlan = RENTAL_PLANS.find((p) => p.id === planId) ?? RENTAL_PLANS[1];
  const usagePercent = rentalSlots > 0 ? Math.round((rentals.length / rentalSlots) * 100) : 0;

  if (!isLoggedIn) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-muted">ログインが必要です</p>
        <Link href="/auth/login" className="btn-primary">ログイン</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="page-header">
        <p className="label-caps mb-1">Account</p>
        <h1 className="page-title">アカウント設定</h1>
        <p className="page-subtitle">{userName ?? "ユーザー"} さんの設定を管理します</p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { icon: Package, label: "レンタル中", value: `${rentals.length}件` },
          { icon: Heart, label: "お気に入り", value: `${favorites.length}件` },
          { icon: CreditCard, label: "残り枠", value: `${availableSlots}枠` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="surface-card p-4 text-center">
            <Icon size={16} className="mx-auto mb-2 text-gold" />
            <p className="text-lg font-medium text-cream">{value}</p>
            <p className="text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        <Section title="プロフィール" description="表示名とメールアドレス">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-muted">お名前</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="お名前"
                  disabled={isDemoAccount}
                />
                <button
                  type="button"
                  className="btn-primary shrink-0 !px-4"
                  disabled={isDemoAccount}
                  onClick={() => {
                    const result = updateName(name);
                    setNameMsg(
                      result.ok
                        ? { text: "名前を更新しました", type: "ok" }
                        : { text: result.error ?? "更新に失敗しました", type: "error" }
                    );
                  }}
                >
                  保存
                </button>
              </div>
              {isDemoAccount && <p className="mt-2 text-xs text-muted">デモアカウントは変更できません</p>}
              {nameMsg && <div className="mt-2"><Message {...nameMsg} /></div>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted">メールアドレス</label>
              <input type="email" className="input-field opacity-60" value={userEmail ?? ""} readOnly />
            </div>
          </div>
        </Section>

        <Section title="パスワード" description="8文字以上で設定してください">
          {isDemoAccount ? (
            <p className="text-sm text-muted">デモアカウントはパスワードを変更できません</p>
          ) : (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (newPassword !== confirmPassword) {
                  setPasswordMsg({ text: "新しいパスワードが一致しません", type: "error" });
                  return;
                }
                const result = updatePassword(currentPassword, newPassword);
                setPasswordMsg(
                  result.ok
                    ? { text: "パスワードを変更しました", type: "ok" }
                    : { text: result.error ?? "変更に失敗しました", type: "error" }
                );
                if (result.ok) {
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }
              }}
            >
              <input
                type="password"
                className="input-field"
                placeholder="現在のパスワード"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="input-field"
                placeholder="新しいパスワード"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
                required
              />
              <input
                type="password"
                className="input-field"
                placeholder="新しいパスワード（確認）"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
              />
              {passwordMsg && <Message {...passwordMsg} />}
              <button type="submit" className="btn-primary">パスワードを変更</button>
            </form>
          )}
        </Section>

        <Section title="契約プラン" description="ローカル確認用 — プラン変更は即時反映されます">
          <div className="mb-5 rounded-xl border border-gold/20 bg-gold/5 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-caps !text-[0.6rem]">Current Plan</p>
                <p className="font-display text-xl text-cream">{currentPlan.name}</p>
                <p className="mt-1 text-sm text-muted">
                  ¥{currentPlan.price.toLocaleString()}/月 · 同時レンタル {currentPlan.slots}枠
                </p>
              </div>
              <Link href="/plan" className="btn-ghost !py-2 !text-xs">プラン一覧</Link>
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs text-muted">
                <span>枠の使用状況</span>
                <span>{rentals.length} / {rentalSlots} 枠（{usagePercent}%）</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-dim to-gold transition-all"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {RENTAL_PLANS.map((plan) => {
              const active = plan.id === planId;
              return (
                <button
                  key={plan.id}
                  type="button"
                  disabled={active}
                  onClick={() => {
                    const result = changePlan(plan.id);
                    setPlanMsg(
                      result.ok
                        ? { text: `${plan.name}プランに変更しました`, type: "ok" }
                        : { text: result.error ?? "変更に失敗しました", type: "error" }
                    );
                  }}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    active
                      ? "border-gold/30 bg-gold/10 text-gold"
                      : "border-border text-muted hover:border-border-gold hover:text-cream"
                  }`}
                >
                  <span>{plan.name}（{plan.slots}枠 · ¥{plan.price.toLocaleString()}/月）</span>
                  {active ? <Check size={14} /> : <span className="text-xs">変更</span>}
                </button>
              );
            })}
          </div>
          {planMsg && <div className="mt-3"><Message {...planMsg} /></div>}
        </Section>

        <Section title="通知" description="メール通知の設定（ローカル保存のみ）">
          <label className="flex cursor-pointer items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-gold" />
              <div>
                <p className="text-sm text-cream">メール通知を受け取る</p>
                <p className="text-xs text-muted">レンタル期限・新着素材のお知らせ</p>
              </div>
            </div>
            <input
              type="checkbox"
              className="h-4 w-4 accent-[var(--color-gold)]"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          </label>
        </Section>

        <Section title="アカウント">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/rental" className="btn-ghost flex-1 text-center">
              <Package size={14} /> レンタル中を見る
            </Link>
            <button
              type="button"
              className="btn-ghost flex-1"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <LogOut size={14} /> ログアウト
            </button>
          </div>
          {isDemoAccount && (
            <p className="mt-4 flex items-center gap-2 text-xs text-muted">
              <User size={12} />
              デモアカウントでログイン中（demo@airental.jp）
            </p>
          )}
        </Section>
      </div>
    </div>
  );
}
