import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import type { YukicoderProblem } from "../Problem";

export async function createYukicoderProblems(
	existingProblems: ProblemWithCommonId<YukicoderProblem>[],
) {
	await prisma.yukicoderProblem.createMany({
		data: existingProblems.map((problem) => ({
			...problem.problem.Unpack(),
			commonProblemId: problem.commonProblemId,
		})),
	});
}
