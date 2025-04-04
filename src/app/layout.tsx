"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toolbar } from "@/components/toolbar";
import { PageLayout } from "@/components/page-layout";

import { SWRConfig } from "swr";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function localStorageProvider(): Map<string, any> {
  const map = new Map<string, any>(JSON.parse(localStorage.getItem('app-cache') || '[]'))

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  return map
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <SWRConfig value={{ provider: localStorageProvider, refreshInterval: 0, revalidateOnFocus: false }}>
        <SessionProvider>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <PageLayout toolbar={<Toolbar />} content={children} />
          </body>
        </SessionProvider>
      </SWRConfig>
    </html>
  );
}
