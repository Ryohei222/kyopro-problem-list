import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import type { CodeforcesProblem } from "../Problem";

export async function updateCodeforcesProblems(
	existingProblems: ProblemWithCommonId<CodeforcesProblem>[],
) {
	await Promise.all(
		existingProblems.map((problem) => {
			return prisma.codeforcesProblem.update({
				data: {
					...problem.problem.Unpack(),
				},
				where: {
					commonProblemId: problem.commonProblemId,
				},
			});
		}),
	);
}
