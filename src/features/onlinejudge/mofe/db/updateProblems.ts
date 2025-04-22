import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import type { MofeProblem } from "../Problem";

export async function updateMofeProblems(
	existingProblems: ProblemWithCommonId<MofeProblem>[],
) {
	await Promise.all(
		existingProblems.map((problem) => {
			return prisma.mofeProblem.update({
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
