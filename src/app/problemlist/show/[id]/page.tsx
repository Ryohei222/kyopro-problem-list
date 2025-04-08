import { BackButton } from "@/features/problemset/components/back-button";
import { ProblemListContainer } from "@/features/problemlist/components/ProblemListContainer";

export default async function ProblemSetShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        throw new Error("Problem set ID is required");
    }
    return (
        <div className="space-y-6">
            <BackButton />
            <ProblemListContainer problemListId={id}></ProblemListContainer>
        </div>
    );
}
