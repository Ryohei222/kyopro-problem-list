import type { OnlineJudgeProblem } from "@/types/CommonProblem";
import { ClientSideOnlineJudgeProblemFetchers } from "./OnlineJudges";

export async function fetchProblems() {
	const problems: OnlineJudgeProblem[] = [];
	await Promise.all(
		Object.values(ClientSideOnlineJudgeProblemFetchers).map(
			async (fetchProblems) =>
				fetchProblems().then((fetchedProblems) => {
					problems.push(...fetchedProblems);
				}),
		),
	);
	return problems;
}
