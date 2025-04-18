import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { HelpCircle, Home, Info, Plus, Settings, Star } from "lucide-react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import MyPageButton from "./MyPageButton";

export async function ToolBar() {
	const session = await auth();
	const isLoggedIn = !!session?.user;
	return (
		<header className="sticky top-0 z-10 bg-white border-b border-gray-200">
			<div className="container mx-auto flex items-center justify-between px-4">
				<div className="flex items-center space-x-4">
					<Link href="/" className="flex items-center space-x-2">
						<span className="hidden lg:inline text-xl font-bold text-green-600 truncate">
							Kyopro Problem List
						</span>
					</Link>
					<nav className="items-center space-x-2 md:flex">
						<Button variant="ghost" size="sm" asChild>
							<Link href="/" className="flex items-center space-x-1">
								<Home className="h-4 w-4" />
								<span className="hidden md:inline">すべての問題リスト</span>
							</Link>
						</Button>
						{isLoggedIn && (
							<>
								<Button variant="ghost" size="sm" asChild>
									<Link href="/starred" className="flex items-center space-x-1">
										<Star className="h-4 w-4" />
										<span className="hidden md:inline">お気に入り</span>
									</Link>
								</Button>
								<Button variant="ghost" size="sm" asChild>
									<Link
										href="/problemlist/create"
										className="flex items-center space-x-1"
									>
										<Plus className="h-4 w-4" />
										<span className="hidden md:inline">新規作成</span>
									</Link>
								</Button>
								<Button variant="ghost" size="sm" asChild>
									<Link
										href="/settings"
										className="flex items-center space-x-1"
									>
										<Settings className="h-4 w-4" />
										<span className="hidden md:inline">設定</span>
									</Link>
								</Button>
							</>
						)}
						<AboutButton />
					</nav>
				</div>
				<div className="flex ">
					{isLoggedIn ? (
						<MyPageButton userId={session.user?.id || ""} />
					) : (
						<LoginButton />
					)}
				</div>
			</div>
		</header>
	);
}

function AboutButton() {
	return (
		<Button variant="ghost" size="sm" asChild>
			<Link href="/about" className="flex items-center space-x-1">
				<Info className="h-4 w-4" />
				<span className="hidden md:inline">About</span>
			</Link>
		</Button>
	);
}
