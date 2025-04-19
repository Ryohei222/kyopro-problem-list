import { CodeforcesProblemsApiSchema } from "../../externalapi/codeforces/ProblemsSchema";
import { getCodeforcesContests } from "../../externalapi/codeforces/getCodeforcesContests";
import type { CommonProblem } from "../interfaces/CommonProblem";
import { fetchApi } from "../utils/fetchApi";
import { CodeforcesProblem } from "./Problem";
import { CODEFORCES_API_URL } from "./constants";

export async function fetchCodeforcesProblems(): Promise<CommonProblem[]> {
	const contests = await getCodeforcesContests();
	const contestMap = new Map(contests.map((c) => [c.id, c.name]));
	const data = await fetchApi(
		`${CODEFORCES_API_URL}/problemset.problems`,
		CodeforcesProblemsApiSchema,
	);
	return data.result.problems.map(
		(p) => new CodeforcesProblem(p.contestId.toString(), p.index, p.name),
	);
}
