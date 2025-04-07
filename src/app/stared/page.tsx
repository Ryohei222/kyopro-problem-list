import { ProblemListCards } from "@/features/problemset/components/problem-list-cards";
import { getStaredProblemSets } from "@/features/problemset/db/getStaredProblemSets";
import { auth } from "@/lib/auth";
import { ReactNode } from "react";

export default async function StaredPage(): Promise<ReactNode> {
    const session = await auth();
    if (!session?.user?.id) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold mb-6">ログインしてください</h1>
                <p className="text-lg">お気に入りの問題リストを表示するにはログインが必要です。</p>
            </div>
        );
    }

    const problemSets = await getStaredProblemSets(session.user.id);
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">お気に入りの問題リスト</h1>
            {problemSets && <ProblemListCards problemLists={problemSets} />}
        </div>
    );
}
