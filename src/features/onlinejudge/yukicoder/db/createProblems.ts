import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import type { YukicoderProblem } from "../Problem";

export async function createYukicoderProblems(
	existingProblems: ProblemWithCommonId<YukicoderProblem>[],
) {
	await prisma.$transaction(
		existingProblems.map((problem) => {
			return prisma.yukicoderProblem.update({
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
