import { UserProfile } from "@/features/user/components/user-profile";
import { notFound } from "next/navigation";
import { getUserById } from "@/features/user/db/getUser";
import { getUserProblemSets } from "@/features/problemset/db/getUserProblemSets";
import { ProblemListCards } from "@/features/problemset/components/problem-list-cards";
import { Separator } from "@/components/ui/separator";
import { Book } from "lucide-react";
import { auth } from "@/lib/auth";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
    const userId = (await params).id;
    const user = await getUserById(userId);

    if (!user) {
        notFound();
    }

    const session = await auth();
    const isAuthor = session?.user.id === userId;

    const usersProblemSets = await getUserProblemSets(userId, !isAuthor);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="space-y-10">
                {/* ユーザープロフィールセクション */}
                <section>
                    <UserProfile user={user} />
                </section>

                {/* 作成した問題リストセクション */}
                <section className="mt-12">
                    <div className="flex items-center mb-6">
                        <Book className="h-6 w-6 mr-3 text-blue-600" />
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            作成した問題リスト
                        </h2>
                    </div>

                    <Separator className="mb-8" />

                    {usersProblemSets && usersProblemSets.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            <ProblemListCards problemLists={usersProblemSets} />
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-gray-500 text-lg">
                                まだ問題リストが作成されていません
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
