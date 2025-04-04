import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { queryProblemSetDetail } from "@/controller/types"

export function ProblemSetStarButton({ problemSet }: { problemSet: NonNullable<queryProblemSetDetail> }) {
    const [isStarred, setIsStarred] = useState(false);

    const toggleStar = async () => {
        if (!isStarred) {
            await fetch(`/api/star`, { method: "POST", body: JSON.stringify({ problemSetId: problemSet.id }) });
        } else {
            await fetch(`/api/star`, { method: "DELETE", body: JSON.stringify({ problemSetId: problemSet.id }) });
        }
        setIsStarred(!isStarred)
    }

    return (
        <Button variant="outline" size="sm" onClick={toggleStar} className={isStarred ? "text-yellow-500" : ""}>
            <Star className={`h-4 w-4 mr-1 ${isStarred ? "fill-yellow-400" : ""}`} />
            <span>{isStarred ? problemSet.stars.length + 1 : problemSet.stars.length}</span>
        </Button>
    )
}

