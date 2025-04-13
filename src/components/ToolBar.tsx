import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Plus, Star, Settings } from "lucide-react";
import LoginButton from "./LoginButton";
import MyPageButton from "./MyPageButton";
import { auth } from "@/auth";

export async function ToolBar() {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="container mx-auto flex items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="hidden md:inline text-xl font-bold text-green-600 truncate">
                            Kyopro Problem List
                        </span>
                    </Link>
                    <nav className="items-center space-x-2 md:flex">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/" className="flex items-center space-x-1">
                                <Home className="h-4 w-4" />
                                <span className="hidden sm:inline">すべての問題リスト</span>
                            </Link>
                        </Button>
                        {isLoggedIn && (
                            <>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/starred" className="flex items-center space-x-1">
                                        <Star className="h-4 w-4" />
                                        <span className="hidden sm:inline">お気に入り</span>
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link
                                        href="/problemlist/create"
                                        className="flex items-center space-x-1"
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span className="hidden sm:inline">新規作成</span>
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/settings" className="flex items-center space-x-1">
                                        <Settings className="h-4 w-4" />
                                        <span className="hidden sm:inline">設定</span>
                                    </Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </div>
                <div className="flex items-center space-x-2">
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
