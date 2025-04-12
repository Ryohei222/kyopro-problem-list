import { getStarredProblemLists } from "../db/getStaredProblemSets";
import { ProblemListsPresenter } from "./ProblemListsPresenter";

export async function StarredProblemListsContainer({ userId }: { userId: string }) {
    const starredProblemLists = await getStarredProblemLists(userId);
    return <ProblemListsPresenter problemLists={starredProblemLists} />;
}
