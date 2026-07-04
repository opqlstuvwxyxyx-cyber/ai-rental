export default function TokushoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="page-title mb-8">特定商取引法に基づく表記</h1>
      <dl className="space-y-4 text-sm">
        {[
          ["販売事業者", "（正式リリース前に記載）"],
          ["運営責任者", "（正式リリース前に記載）"],
          ["所在地", "（正式リリース前に記載）"],
          ["連絡先", "（正式リリース前に記載）"],
          ["販売価格", "各プランの料金ページに記載"],
          ["支払方法", "クレジットカード（決済連携後）"],
          ["引渡時期", "決済完了後、直ちにご利用可能"],
          ["返品・キャンセル", "サービスの性質上、原則として返金不可"],
        ].map(([k, v]) => (
          <div key={k} className="grid gap-1 border-b border-border pb-4 sm:grid-cols-3">
            <dt className="font-medium text-cream">{k}</dt>
            <dd className="text-muted sm:col-span-2">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-xs text-muted">※ 決済機能リリース前のプレースホールドです。事業者情報を必ず追記してください。</p>
    </div>
  );
}
