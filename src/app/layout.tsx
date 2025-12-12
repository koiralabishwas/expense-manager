import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TopBar from "../components/TopBar";
import AuthProvider from "../providers/AuthProvider";
import MUIThemeProvider from "../providers/MUIThemeProvider";
import { EmotionCacheProvider } from "../providers/EmotionCacheProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";
import Box from "@mui/material/Box";

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
      <body >
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>

          <AuthProvider>
            <ReactQueryProvider>
              <MUIThemeProvider>
                <EmotionCacheProvider>
                  <TopBar />
                  {children}
                </EmotionCacheProvider>
              </MUIThemeProvider>
            </ReactQueryProvider>
          </AuthProvider>
        </Box>
      </body>
    </html>
  );
}
