import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "../components/TopBar";
import AuthProvider from "../providers/AuthProvider";
import MUIThemeProvider from "../providers/MUIThemeProvider";
import { EmotionCacheProvider } from "../providers/EmotionCacheProvider";
import { getServerSession } from "next-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession()

  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <EmotionCacheProvider>
          <MUIThemeProvider>
            <AuthProvider>
              <TopBar session={session} />
              {children}
            </AuthProvider>
          </MUIThemeProvider>
        </EmotionCacheProvider>
      </body>
    </html>
  );
}
