"use client";

import { Share2 } from "lucide-react";
import { CardHeaderButton } from "./CardHeaderButton";
import { ProblemListResponse } from "../types/ProblemLists";
import { openTweetPage } from "@/utils/openTweetPage";

type ShareButtonProps = {
    problemList: NonNullable<ProblemListResponse>;
};

export function ShareButton(props: ShareButtonProps) {
    const tweetText = `📋${props.problemList.name} by ${props.problemList.author.name}\n\n#KyoproProblemList\n\nhttps://kyopro-problem-list.vercel.app/problemlist/show/${props.problemList.id}`;
    return (
        <CardHeaderButton
            label="Share on X"
            lucideIcon={Share2}
            variant="default"
            onClick={() => openTweetPage(tweetText)}
        />
    );
}
