import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import type { AojProblem } from "../Problem";

export async function updateAojProblems(
	existingProblems: ProblemWithCommonId<AojProblem>[],
) {
	await prisma.$transaction(
		existingProblems.map((problem) => {
			return prisma.aojProblem.update({
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
