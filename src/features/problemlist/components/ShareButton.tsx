"use client";

import { Share2 } from "lucide-react";
import { CardHeaderButton } from "./CardHeaderButton";
import { useRouter } from "next/navigation";
import { ProblemListResponse } from "../types/ProblemLists";

type ShareButtonProps = {
    problemList: NonNullable<ProblemListResponse>;
};

export function ShareButton(props: ShareButtonProps) {
    const router = useRouter();
    return (
        <CardHeaderButton
            label="Share on X"
            lucideIcon={Share2}
            variant="default"
            onClick={() => {}}
        />
    );
}
