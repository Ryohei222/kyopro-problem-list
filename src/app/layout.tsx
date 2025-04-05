import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toolbar } from "@/components/toolbar";
import { PageLayout } from "@/components/page-layout";
import { getProblems } from "@/features/problem/db/getProblems";
import { ProblemsProvider } from "@/features/problem/components/problems-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const problems = await getProblems();

  return (
    <html lang="ja">
      <SessionProvider>
        <ProblemsProvider problems={problems}>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <PageLayout toolbar={<Toolbar />} content={children} />
          </body>
        </ProblemsProvider>
      </SessionProvider>
    </html>
  );
}
