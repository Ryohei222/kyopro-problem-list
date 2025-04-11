import { BackButton } from "@/features/problemlist/components/BackButton";
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
            <EditProblemListForm problemList={problemList} />
        </div>
    );
}
