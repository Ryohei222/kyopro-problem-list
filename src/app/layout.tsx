import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toolbar } from "@/components/toolbar";
import { PageLayout } from "@/components/page-layout";
import { SWRProvider } from "@/hooks/SWRProvider";

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
    return (
        <html lang="ja">
            <SWRProvider>
                <SessionProvider>
                    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                        <PageLayout toolbar={<Toolbar />} content={children} />
                    </body>
                </SessionProvider>
            </SWRProvider>
        </html>
    );
}
