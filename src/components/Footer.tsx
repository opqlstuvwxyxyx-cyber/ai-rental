import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-[0.6rem] font-semibold text-gold">AR</div>
              <span className="font-display tracking-widest text-cream">AI RENTAL</span>
            </div>
            <p className="text-sm text-muted">動画広告素材のレンタル型サブスクサービス（ローカル確認用）</p>
          </div>
          <div>
            <h3 className="label-caps mb-3">Service</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/materials" className="hover:text-gold">素材一覧</Link></li>
              <li><Link href="/plan" className="hover:text-gold">料金プラン</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="label-caps mb-3">Account</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/auth/login" className="hover:text-gold">ログイン</Link></li>
              <li><Link href="/auth/register" className="hover:text-gold">新規登録</Link></li>
            </ul>
          </div>
        </div>
        <div className="gold-line mt-8 mb-4" />
        <p className="text-center text-xs text-muted/60">© 2026 AI RENTAL — Local Preview</p>
      </div>
    </footer>
  );
}
