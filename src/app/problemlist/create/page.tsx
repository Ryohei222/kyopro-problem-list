import { CreateProblemListForm } from "@/features/problemlist/components/CreateProblemListForm";
import buildTwitterMetadata from "@/utils/buildTwitterMetaData";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "新規作成",
	twitter: buildTwitterMetadata({
		title: "新規作成",
		description: "新しい問題リストを作成するページです",
	}),
};

export default function CreateProblemSetPage() {
	return (
		<div className="max-w-2xl mx-auto space-y-6">
			<CreateProblemListForm />
		</div>
	);
}
