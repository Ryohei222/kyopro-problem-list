import { EditProblemListForm } from "@/features/problemset/components/edit-problem-list-form"
import { getProblemSetById } from "@/features/problemset/db/ProblemSet"
import { BackButton } from "../components/back-button"
import { notFound } from "next/navigation"

export default async function EditProblemSetPage({ id }: { id: string }) {
    const problemSet = await getProblemSetById(Number(id))

    if (!problemSet) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <BackButton />
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">問題リストを編集</h1>
                <EditProblemListForm problemSet={problemSet} />
            </div>
        </div>
    )
}