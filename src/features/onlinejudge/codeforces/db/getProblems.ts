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
			problem: new CodeforcesProblem(
				problem.index,
				problem.name,
				problem.contestId,
				problem.contestName,
				problem.points ?? undefined,
				problem.rating ?? undefined,
			),
		};
	});
}
