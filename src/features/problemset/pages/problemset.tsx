import { ProblemSetDetail } from "../components/problemset-detail";
import { notFound } from "next/navigation"
import { getProblemSetById } from "@/controller/ProblemSet"
import { BackButton } from "../components/back-button";

export default async function ProblemSetPage({ id }: { id: string }) {
    const problemSet = await getProblemSetById(Number(id));
    console.log(problemSet);

    if (!problemSet) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <BackButton />
            <ProblemSetDetail problemset={problemSet} />
        </div>
    )
}