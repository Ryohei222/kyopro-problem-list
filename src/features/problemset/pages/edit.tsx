import EditProblemListForm from "@/features/problemset/components/edit-problem-list-form"
import { getProblemSetById } from "@/features/problemset/db/ProblemSet"
import { BackButton } from "../components/back-button"
import { notFound } from "next/navigation"
import { ReactElement } from "react"

export default async function EditProblemSetPage({ params }: { params: { id: string } }): Promise<ReactElement> {
    const { id } = params;
    const problemSet = await getProblemSetById(Number(id))

    if (!problemSet) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <BackButton />
            <div className="max-w-3xl mx-auto">
                <EditProblemListForm problemSet={problemSet} />
            </div>
        </div>
    )
}