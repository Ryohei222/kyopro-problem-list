import { ProblemSetDetail } from "../components/problemset-detail";
import { BackButton } from "../components/back-button";
import { getProblemSetById } from "../db/ProblemSet";

export default async function ProblemSetShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        throw new Error("Problem set ID is required");
    }
    const problemSet = await getProblemSetById(Number(id));
    if (!problemSet) {
        throw new Error("Problem set not found");
    }
    return (
        <div className="space-y-6">
            <BackButton />
            <ProblemSetDetail problemset={problemSet} />
        </div>
    );
}
