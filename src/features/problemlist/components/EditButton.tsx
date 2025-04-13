"use client";

import { Edit } from "lucide-react";
import { CardHeaderButton } from "./CardHeaderButton";
import { useRouter } from "next/navigation";
import { ProblemListResponse } from "../types/ProblemLists";

type EditButtonProps = {
    problemList: NonNullable<ProblemListResponse>;
};

export function EditButton(props: EditButtonProps) {
    const router = useRouter();
    return (
        <CardHeaderButton
            label="編集"
            lucideIcon={Edit}
            variant="outline"
            onClick={() => router.push(`/problemlist/edit/${props.problemList.id}`)}
        />
    );
}
