import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Playfair_Display } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp", weight: ["300","400","500","700"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400","500","600","700"] });

export const metadata: Metadata = {
  title: "AI RENTAL | 動画素材レンタルサービス",
  description: "動画広告素材をレンタルできるサブスクサービス（ローカル確認用）",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJP.variable} ${playfair.variable} flex min-h-screen flex-col antialiased`}>
        <AppProvider>
          <div className="border-b border-gold/20 bg-gold/5 px-4 py-1.5 text-center text-xs text-gold/80">
            ローカル確認用 — 外部サービス契約不要・データはブラウザ内のみ保存
          </div>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
