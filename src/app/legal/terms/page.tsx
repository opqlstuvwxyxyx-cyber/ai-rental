export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="page-title mb-8">利用規約</h1>
      <div className="prose-sm space-y-6 text-sm leading-relaxed text-muted">
        <p>本利用規約（以下「本規約」）は、AI RENTAL（以下「当サービス」）の利用条件を定めるものです。</p>
        <section>
          <h2 className="mb-2 font-medium text-cream">第1条（適用）</h2>
          <p>ユーザーは、本規約に同意の上、当サービスを利用するものとします。</p>
        </section>
        <section>
          <h2 className="mb-2 font-medium text-cream">第2条（レンタル素材の利用）</h2>
          <p>レンタルした動画素材は、当サービスが定める範囲内での広告テスト・検証目的に限り利用できます。再配布・転売は禁止します。</p>
        </section>
        <section>
          <h2 className="mb-2 font-medium text-cream">第3条（禁止事項）</h2>
          <p>法令違反、公序良俗に反する利用、当サービスの運営を妨害する行為を禁止します。</p>
        </section>
        <section>
          <h2 className="mb-2 font-medium text-cream">第4条（免責）</h2>
          <p>当サービスは現状有姿で提供されます。素材の広告成果等について保証するものではありません。</p>
        </section>
        <p className="text-xs">※ 本ページはプレースホールドです。正式リリース前に弁護士等によるレビューを推奨します。</p>
      </div>
    </div>
  );
}
