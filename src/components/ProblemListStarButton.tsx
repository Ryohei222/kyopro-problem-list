import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ProblemListResponse } from "@/features/problemlist/types/ProblemLists";
import { auth } from "@/lib/auth";
import { getStar } from "@/db/Star";
import { ClientStarButton } from "./ClientStarButton";

export async function ProblemListStarButton({
    problemList,
}: {
    problemList: NonNullable<ProblemListResponse>;
}) {
    const userId = (await auth())?.user?.id;
    const isStarred = userId && (await getStar(problemList.id, userId));
    if (!userId || !problemList) {
        return <></>;
    }
    return (
        <ClientStarButton userId={userId} problemList={problemList} defaultStarFlag={!!isStarred} />
    );
}
