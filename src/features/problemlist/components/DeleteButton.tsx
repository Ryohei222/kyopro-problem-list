"use client";

import { Trash2 } from "lucide-react";
import { CardHeaderButton } from "./CardHeaderButton";
import { useRouter } from "next/navigation";
import { ProblemListResponse } from "../types/ProblemLists";

type DeleteButtonProps = {
    problemList: NonNullable<ProblemListResponse>;
};

export function DeleteButton(props: DeleteButtonProps) {
    const router = useRouter();
    return (
        <CardHeaderButton
            label="削除"
            lucideIcon={Trash2}
            variant="destructive"
            onClick={() => router.push(`/problemlist/delete/${props.problemList.id}`)}
        />
    );
}
