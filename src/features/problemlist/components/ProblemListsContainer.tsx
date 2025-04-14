import { getPublicProblemLists } from "../db/getPublicProblemLists";
import { ProblemListsPresenter } from "./ProblemListsPresenter";

export async function ProblemListsContainer() {
	const problemLists = await getPublicProblemLists();
	return <ProblemListsPresenter problemLists={problemLists} />;
}
