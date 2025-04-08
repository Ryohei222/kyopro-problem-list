import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ToolBar } from "@/components/ToolBar";
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
                        <div className="min-h-screen bg-gray-50">
                            <ToolBar />
                            <main className="container mx-auto py-6 px-4">{children}</main>
                        </div>
                    </body>
                </SessionProvider>
            </SWRProvider>
        </html>
    );
}
