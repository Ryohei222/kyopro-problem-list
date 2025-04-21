import { prisma } from "@/prisma";
import { createProblemIds } from "../../db/createProblemIds";
import type { MofeProblem } from "../Problem";

export async function createMofeProblems(
	problems: MofeProblem[],
): Promise<MofeProblem[]> {
	const ids = await createProblemIds(problems.length);
	await prisma.mofeProblem.createMany({
		data: problems.map((problem, index) => ({
			commonProblemId: ids[index],
			...problem.Unpack(),
		})),
	});
	return problems;
}
