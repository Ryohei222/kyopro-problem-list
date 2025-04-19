import { AojProblemsApiSchema } from "../../externalapi/aoj/ProblemsSchema";
import type { CommonProblem } from "../interfaces/CommonProblem";
import { fetchApi } from "../utils/fetchApi";
import { AojProblem } from "./Problem";
import { AOJ_API_URL } from "./constants";

export async function fetchAojProblems(): Promise<CommonProblem[]> {
	const problems = await fetchApi(
		`${AOJ_API_URL}/problems?size=100000`,
		AojProblemsApiSchema,
	);
	return problems.map((p) => new AojProblem(p.id, p.name));
}
