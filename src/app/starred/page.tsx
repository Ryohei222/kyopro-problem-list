import { StarredProblemListsContainer } from "@/features/problemlist/components/StarredProblemListContainer";
import buildTwitterMetadata from "@/utils/buildTwitterMetaData";
import getUserIdFromSession from "@/utils/getUserIdFromSession";
import type { Metadata } from "next";
import type { ReactNode } from "react";

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
			<h1 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
				お気に入りの問題リスト
			</h1>
			<StarredProblemListsContainer userId={userId} />
		</div>
	);
}
