import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import { CodeforcesProblem } from "../Problem";

export async function readCodeforcesProblems(): Promise<
	ProblemWithCommonId<CodeforcesProblem>[]
> {
	const dbProblems = await prisma.codeforcesProblem.findMany({});
	return dbProblems.map((problem) => {
		return {
			commonProblemId: problem.commonProblemId,
			problem: new CodeforcesProblem({
				...problem,
				points: problem.points ?? undefined,
				rating: problem.rating ?? undefined,
			}),
		};
	});
}
