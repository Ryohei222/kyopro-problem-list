import { BackButton } from "@/features/problemlist/components/BackButton";
import { getProblemList } from "@/features/problemlist/db/getProblemList";
import { auth } from "@/auth";
import { getUser } from "@/features/user/db/getUser";
import { ProblemListWithIdsForm } from "@/features/problemlist/components/ProblemListWithIdsForm";
import { Card, CardContent } from "@/components/ui/card";
import { ProblemListCardHeader } from "@/features/problemlist/components/ProblemListCardHeader";

export default async function ProblemListShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        throw new Error("Problem list ID is required");
    }
    const problemList = await getProblemList(id);
    if (!problemList) {
        console.error("Problem list not found");
        throw new Error("Problem list not found");
    }

    const currentUserId = (await auth())?.user?.id;
    const currentUser = currentUserId ? await getUser(currentUserId) : null;

    return (
        <div className="space-y-6">
            <BackButton />
            <Card>
                <ProblemListCardHeader
                    problemList={problemList}
                    isLogined={!!currentUser}
                    isAuthor={currentUser?.id === problemList.author.id}
                />
                <CardContent>
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">概要</h3>
                        <p className="text-gray-700 whitespace-pre-line">
                            {problemList.description}
                        </p>
                    </div>
                    <ProblemListWithIdsForm
                        problemListRecords={problemList.problemListRecords}
                        user={currentUser}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
