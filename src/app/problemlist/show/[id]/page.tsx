import { ProblemListCardHeader } from "@/app/problemlist/show/_components/ProblemListCardHeader";
import { ProblemListWithIdsForm } from "@/app/problemlist/show/_components/ProblemListWithIdsForm";
import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { getProblemList } from "@/features/problemlist/db/getProblemList";
import { getUser } from "@/features/user/db/getUser";
import buildTwitterMetadata from "@/utils/buildTwitterMetaData";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const problemList = await getProblemList(id);
  const title = problemList?.name || "問題リストが見つかりません";
  const description =
    problemList?.description || "問題リストの説明が見つかりません";
  return {
    title: title,
    twitter: buildTwitterMetadata({
      title: `${title} by ${problemList?.author.name}`,
      description: description,
    }),
  };
}

export default async function ProblemListShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
      <Card className="p-4 pb-10">
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
