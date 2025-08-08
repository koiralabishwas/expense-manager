import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TopBar from "../components/TopBar";
import AuthProvider from "../providers/AuthProvider";
import MUIThemeProvider from "../providers/MUIThemeProvider";
import { EmotionCacheProvider } from "../providers/EmotionCacheProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "家計師くん",
  description: "by koirala bishwas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <ReactQueryProvider>
            <MUIThemeProvider>
              <EmotionCacheProvider>
                <TopBar />
                <div
                  style={{
                  backgroundColor: "#ffeaea",
                  borderRadius: "3px",
                  padding: "8px 12px",
                  marginBottom: "8px",
                  }}
                >
                  <span
                  style={{
                    fontFamily: "inherit",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    color: "#2a3d11ff",
                  }}
                  >
                  開発中のため、起動がおかしいときは一回 logout してみてください
                  </span>
                </div>
                {children}
              </EmotionCacheProvider>
            </MUIThemeProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
