"use client";

import { Button } from "@/components/ui/button";
import type { ProblemListResponse } from "@/features/problemlist/types/ProblemLists";
import { Delete, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProblemList } from "../../../../features/problemlist/db/deleteProblemList";

export function ProblemListDeleteButton({
	problemList,
}: {
	problemList: NonNullable<ProblemListResponse>;
}) {
	const router = useRouter();
	const handleDelete = async () => {
		const result = await deleteProblemList(problemList.id);
		router.push("/");
	};

	return (
		<Button variant="destructive" size="sm" onClick={handleDelete}>
			<Trash2 className="h-4 w-4 mr-1" />
			<span>削除</span>
		</Button>
	);
}
