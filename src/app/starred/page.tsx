import { ReactNode } from "react";
import { StarredProblemListsContainer } from "@/features/problemlist/components/StarredProblemListContainer";

export default async function StarredProblemListsPage(): Promise<ReactNode> {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">お気に入りの問題リスト一覧</h1>
            <StarredProblemListsContainer />
        </div>
    );
}
