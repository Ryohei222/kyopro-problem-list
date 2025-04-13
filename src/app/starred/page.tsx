import { ReactNode } from "react";
import { StarredProblemListsContainer } from "@/features/problemlist/components/StarredProblemListContainer";
import getUserIdFromSession from "@/utils/getUserIdFromSession";
import { Metadata } from "next";
import buildTwitterMetadata from "@/utils/buildTwitterMetaData";

export const metadata: Metadata = {
    title: "お気に入り",
    twitter: buildTwitterMetadata({
        title: "お気に入り",
        description: "お気に入りの問題リストを確認できます",
    }),
};

export default async function StarredProblemListsPage(): Promise<ReactNode> {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return <div className="text-red-500">ログインしてください</div>;
    }
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">お気に入りの問題リスト一覧</h1>
            <StarredProblemListsContainer userId={userId} />
        </div>
    );
}
