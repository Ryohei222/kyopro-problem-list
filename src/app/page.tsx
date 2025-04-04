"use client";

import { useProblems } from "@/features/problem/hooks/useProblems"
import { usePublicProblemSets } from "@/features/problemset/hooks/usePublicProblemSets"
import { ProblemListTable } from "@/features/problemset-list/components/problem-list-table"

export default function Home() {
  const { problems, isLoading: isLoadingProblems, error: errorProblems } = useProblems()
  const { problemSets, isLoading: isLoadingProblemSet, error: errorProblemSet } = usePublicProblemSets()

  if (isLoadingProblems || isLoadingProblemSet) return <div>Loading...</div>
  if (errorProblems) return <div>Error: {errorProblems.message}</div>
  if (errorProblemSet) return <div>Error: {errorProblemSet.message}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">問題リスト一覧</h1>
      {problemSets && <ProblemListTable problemLists={problemSets} />}
    </div>
  )
}