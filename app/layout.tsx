import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ALLOW_SEARCH_INDEXING } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "소상공인 지원 길잡이",
  description: "사업자등록증 한 장으로 내 가게에 맞는 정부지원사업을 찾고, 사업계획서 초안까지 준비하세요.",
  // 모든 페이지의 noindex 메타태그. 켜고 끄는 건 lib/site.ts 에서 합니다.
  robots: { index: ALLOW_SEARCH_INDEXING, follow: ALLOW_SEARCH_INDEXING },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
