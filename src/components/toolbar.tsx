import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Plus, Star } from "lucide-react";
import LoginButton from "./LoginButton";
import MyPageButton from "./MyPageButton";
import { auth } from "@/lib/auth";

export async function Toolbar() {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl text-green-600">AtCoder Problemset</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/" className="flex items-center space-x-1">
                                <Home className="h-4 w-4" />
                                <span>問題リスト</span>
                            </Link>
                        </Button>
                        {isLoggedIn && (
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/stared" className="flex items-center space-x-1">
                                    <Star className="h-4 w-4" />
                                    <span>お気に入りの問題リスト</span>
                                </Link>
                            </Button>
                        )}
                        {isLoggedIn && (
                            <Button variant="ghost" size="sm" asChild>
                                <Link
                                    href="/problemlist/create"
                                    className="flex items-center space-x-1"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>新規作成</span>
                                </Link>
                            </Button>
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
