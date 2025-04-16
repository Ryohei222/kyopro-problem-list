import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToolBar } from "@/components/ToolBar";
import { SWRProvider } from "@/hooks/SWRProvider";
import buildTwitterMetadata from "@/utils/buildTwitterMetaData";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Kyopro Problem List",
		default: "Kyopro Problem List", // a default is required when creating a template
	},
	twitter: buildTwitterMetadata({
		description: "Manage your kyopro problem lists.",
	}),
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<SWRProvider>
				<SessionProvider>
					<body
						className={`${geistSans.variable} ${geistMono.variable} antialiased`}
					>
						<div className="min-h-screen bg-gray-50">
							<ToolBar />
							<main className="container mx-auto py-6 px-4">{children}</main>
						</div>
					</body>
				</SessionProvider>
			</SWRProvider>
			{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID &&
				process.env.NODE_ENV === "production" && (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
				)}
		</html>
	);
}
