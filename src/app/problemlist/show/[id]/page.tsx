import { ProblemListContainer } from "@/features/problemlist/components/ProblemListContainer";
import { BackButton } from "@/features/problemlist/components/BackButton";

export default async function ProblemListShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        throw new Error("Problem list ID is required");
    }
    return (
        <div className="space-y-6">
            <BackButton />
            <ProblemListContainer problemListId={id} />
        </div>
    );
}
