import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import type { MofeProblem } from "../Problem";

export async function createMofeProblems(
	newProblems: ProblemWithCommonId<MofeProblem>[],
) {
	await prisma.mofeProblem.createMany({
		data: newProblems.map((problem) => ({
			commonProblemId: problem.commonProblemId,
			...problem.problem.Unpack(),
		})),
	});
}
