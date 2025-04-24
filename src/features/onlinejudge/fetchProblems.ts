import type { CommonProblem } from "@/types/CommonProblem";
import { ClientSideOnlineJudgeApi } from "./OnlineJudges";
import { fetchAtcoderProblems } from "./atcoder/fetchProblems";

export async function fetchProblems() {
	console.log("start fetching");
	const problems: CommonProblem[] = await fetchAtcoderProblems();
	console.log("fetched problems", problems);
	// await Promise.all(
	// 	Object.values(ClientSideOnlineJudgeApi).map(async (api) =>
	// 		api.fetchProblems().then((fetchedProblems) => {
	// 			console.log(fetchProblems);
	// 			problems.push(...fetchedProblems);
	// 		}),
	// 	),
	// );
	return problems;
}
