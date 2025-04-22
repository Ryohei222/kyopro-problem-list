import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import type { AtcoderProblem } from "../Problem";

export async function updateAtcoderProblems(
	existingProblems: ProblemWithCommonId<AtcoderProblem>[],
) {
	await Promise.all(
		existingProblems.map((problem) => {
			return prisma.atcoderProblem.update({
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
