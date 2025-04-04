import { Toolbar } from "@/components/toolbar"
import { ProblemListTable } from "@/components/problem-list-table"
import { getPublicProblemSets } from "@/controller/problemList"

export default async function Home() {
  const problemSets = await getPublicProblemSets();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">問題リスト一覧</h1>
      <ProblemListTable problemLists={problemSets} />
    </div>
  )
}