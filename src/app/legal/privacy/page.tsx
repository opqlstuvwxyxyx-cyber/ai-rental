export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="page-title mb-8">プライバシーポリシー</h1>
      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <p>AI RENTAL（以下「当サービス」）は、ユーザーの個人情報の保護に努めます。</p>
        <section>
          <h2 className="mb-2 font-medium text-cream">1. 収集する情報</h2>
          <p>メールアドレス、お名前、利用履歴（レンタル・お気に入り）等を収集する場合があります。</p>
        </section>
        <section>
          <h2 className="mb-2 font-medium text-cream">2. 利用目的</h2>
          <p>サービス提供、本人確認、お問い合わせ対応、サービス改善のために利用します。</p>
        </section>
        <section>
          <h2 className="mb-2 font-medium text-cream">3. 第三者提供</h2>
          <p>法令に基づく場合を除き、本人の同意なく第三者に提供しません。</p>
        </section>
        <p className="text-xs">※ 本ページはプレースホールドです。正式リリース前に内容を整備してください。</p>
      </div>
    </div>
  );
}
