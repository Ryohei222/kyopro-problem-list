import { ProblemListCards } from "@/features/problemset/components/problem-list-cards";
import { getPublicProblemSets } from "@/features/problemset/db/getPublicProblemSets";
import { ReactNode } from "react";

export default async function HomePage(): Promise<ReactNode> {
  const problemSets = await getPublicProblemSets();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">問題リスト一覧</h1>
      {problemSets && <ProblemListCards problemLists={problemSets} />}
    </div>
  );
}
