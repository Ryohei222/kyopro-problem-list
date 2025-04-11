"use client";

import { ProblemListResponse } from "@/features/problemlist/types/ProblemLists";
import { Button } from "@/components/ui/button";
import { Delete, Trash2 } from "lucide-react";
import { deleteProblemList } from "../db/deleteProblemList";
import { useRouter } from "next/navigation";

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
