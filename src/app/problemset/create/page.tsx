import { CreateProblemListForm } from "@/components/create-problem-list-form"

export default function CreateProblemList() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">新しい問題リストを作成</h1>
      <CreateProblemListForm />
    </div>
  )
}