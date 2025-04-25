import type { CommonProblem } from "@/types/CommonProblem";
import { ClientSideOnlineJudgeApi } from "./OnlineJudges";

export async function fetchProblems() {
	const problems: CommonProblem[] = [];
	for (const api of Object.values(ClientSideOnlineJudgeApi)) {
		problems.push(...(await api.fetchProblems()));
	}
	return problems;
}
