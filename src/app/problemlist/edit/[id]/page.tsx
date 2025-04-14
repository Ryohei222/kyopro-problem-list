import EditProblemListForm from "@/features/problemlist/components/EditProblemListForm";
import { getProblemList } from "@/features/problemlist/db/getProblemList";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

export default async function EditProblemSetPage({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<ReactElement> {
	const { id } = await params;
	const problemList = await getProblemList(id);

	if (!problemList) {
		notFound();
	}

	return (
		<div className="space-y-6">
			<EditProblemListForm problemList={problemList} />
		</div>
	);
}
