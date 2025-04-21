import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import type { AojProblem } from "../Problem";

export async function createAojProblems(
	newProblems: ProblemWithCommonId<AojProblem>[],
) {
	await prisma.$transaction(async () => {
		await prisma.aojProblem.createMany({
			data: newProblems.map((problem) => ({
				commonProblemId: problem.commonProblemId,
				...problem.problem.Unpack(),
			})),
		});
		return newProblems;
	});
}
