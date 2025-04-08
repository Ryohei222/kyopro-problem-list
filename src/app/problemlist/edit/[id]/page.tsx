import { BackButton } from "@/features/problemset/components/back-button";
import { notFound } from "next/navigation";
import { ReactElement } from "react";
import EditProblemListForm from "@/features/problemlist/components/EditProblemListForm";
import { getProblemList } from "@/features/problemlist/db/getProblemList";

export default async function EditProblemSetPage({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<ReactElement> {
    const { id } = await params;
    const problemList = await getProblemList(id);

    if (!problemList) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <BackButton />
            <div className="max-w-3xl mx-auto">
                <EditProblemListForm problemList={problemList} />
            </div>
        </div>
    );
}
