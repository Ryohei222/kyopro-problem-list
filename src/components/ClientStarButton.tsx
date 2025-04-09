"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ProblemListResponse } from "@/features/problemlist/types/ProblemLists";
import { useState } from "react";

import { createStar, deleteStar } from "@/db/Star";

export function ClientStarButton({
    userId,
    problemList,
    defaultStarFlag,
}: {
    userId: string;
    problemList: NonNullable<ProblemListResponse>;
    defaultStarFlag: boolean;
}) {
    const [isStarred, setIsStarred] = useState(defaultStarFlag);

    function handleClick() {
        if (isStarred) {
            deleteStar(problemList.id, userId);
        } else {
            createStar(problemList.id, userId);
        }
        setIsStarred(!isStarred);
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className={isStarred ? "text-yellow-500" : ""}
            onClick={handleClick}
        >
            <Star className={`h-4 w-4 mr-1 ${isStarred ? "fill-yellow-400" : ""}`} />
            <span>
                {problemList.stars.length - (defaultStarFlag ? 1 : 0) + (isStarred ? 1 : 0)}
            </span>
        </Button>
    );
}
