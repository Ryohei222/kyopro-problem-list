import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import type { AtcoderProblem } from "../Problem";

export async function createAtcoderProblems(
	newProblems: ProblemWithCommonId<AtcoderProblem>[],
) {
	await prisma.atcoderProblem.createMany({
		data: newProblems.map((problem) => ({
			commonProblemId: problem.commonProblemId,
			...problem.problem.Unpack(),
		})),
	});
}
