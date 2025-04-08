import getUserIdFromSession from "@/utils/getUserIdFromSession";
import { getStarredProblemLists } from "../db/getStaredProblemSets";
import { ProblemListsPresenter } from "./ProblemListsPresenter";

export async function StarredProblemListsContainer({}) {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return "Please log in to view your starred problem lists.";
    }
    const starredProblemLists = await getStarredProblemLists(userId);
    return <ProblemListsPresenter problemLists={starredProblemLists} />;
}
