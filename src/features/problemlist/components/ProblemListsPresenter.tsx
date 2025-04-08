import { ProblemListsResponse } from "../types/ProblemLists";
import { ProblemListsCards } from "./ProblemListsCards";

export function ProblemListsPresenter({ problemLists }: { problemLists: ProblemListsResponse }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">問題リスト一覧</h1>
            {problemLists && <ProblemListsCards problemLists={problemLists} />}
        </div>
    );
}
