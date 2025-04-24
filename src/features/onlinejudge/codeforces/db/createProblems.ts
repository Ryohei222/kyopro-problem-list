import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import type { CodeforcesProblem } from "../Problem";

export async function createCodeforcesProblems(
	newProblems: ProblemWithCommonId<CodeforcesProblem>[],
) {
	await prisma.codeforcesProblem.createMany({
		data: newProblems.map((problem) => ({
			commonProblemId: problem.commonProblemId,
			...problem.problem.Unpack(),
		})),
	});
}
