import Link from "next/link";

const SERVICE_LINKS = [
  { href: "/materials", label: "素材一覧" },
  { href: "/category", label: "カテゴリ" },
  { href: "/plan", label: "料金プラン" },
  { href: "/sozai-request", label: "素材リクエスト" },
];

const SUPPORT_LINKS = [
  { href: "/legal/terms", label: "利用規約" },
  { href: "/legal/privacy", label: "プライバシーポリシー" },
  { href: "/legal/tokusho", label: "特定商取引法" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-raised/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-xs font-semibold text-gold">AR</div>
              <span className="font-display tracking-widest text-cream">AI RENTAL</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              動画広告素材のレンタル型サブスクリプション。購入前にテストし、成果の出るクリエイティブを見つけます。
            </p>
          </div>
          <div>
            <h3 className="label-caps mb-4">サービス</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              {SERVICE_LINKS.map(({ href, label }) => (
                <li key={href}><Link href={href} className="transition-colors hover:text-gold">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label-caps mb-4">アカウント</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/auth/login" className="hover:text-gold">ログイン</Link></li>
              <li><Link href="/auth/register" className="hover:text-gold">新規登録</Link></li>
              <li><Link href="/settings" className="hover:text-gold">アカウント設定</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="label-caps mb-4">法的情報</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              {SUPPORT_LINKS.map(({ href, label }) => (
                <li key={href}><Link href={href} className="hover:text-gold">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="gold-line mt-10 mb-5" />
        <p className="text-center text-xs text-muted/70">© 2026 AI RENTAL. All rights reserved.</p>
      </div>
    </footer>
  );
}
