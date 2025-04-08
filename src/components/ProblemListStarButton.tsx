import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ProblemListResponse } from "@/features/problemlist/types/ProblemLists";
import { auth } from "@/lib/auth";
import { getStar } from "@/db/Star";

export async function ProblemListStarButton({
    problemList,
}: {
    problemList: NonNullable<ProblemListResponse>;
}) {
    const userId = (await auth())?.user?.id;
    const isStarred = userId && getStar(problemList.id, userId);

    return (
        <Button variant="outline" size="sm" className={isStarred ? "text-yellow-500" : ""}>
            <Star className={`h-4 w-4 mr-1 ${isStarred ? "fill-yellow-400" : ""}`} />
            <span>{isStarred ? problemList.stars.length + 1 : problemList.stars.length}</span>
        </Button>
    );
}
