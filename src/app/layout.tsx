import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Playfair_Display } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import { ToastProvider } from "@/components/Toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp", weight: ["300", "400", "500", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: {
    default: "AI RENTAL | 動画広告素材レンタル",
    template: "%s | AI RENTAL",
  },
  description: "動画広告素材をレンタルできるサブスクリプションサービス。購入リスクなく、クリエイティブを自由にテストできます。",
  openGraph: {
    title: "AI RENTAL | 動画広告素材レンタル",
    description: "動画広告素材をレンタルできるサブスクリプションサービス",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJP.variable} ${playfair.variable} flex min-h-screen flex-col antialiased`}>
        <AppProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
