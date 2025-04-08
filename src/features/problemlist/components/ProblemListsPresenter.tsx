import { ProblemListsResponse } from "../types/ProblemLists";
import { ProblemListsCards } from "./ProblemListsCards";

export function ProblemListsPresenter({ problemLists }: { problemLists: ProblemListsResponse }) {
    return <>{problemLists && <ProblemListsCards problemLists={problemLists} />}</>;
}
