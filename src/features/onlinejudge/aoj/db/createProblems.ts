import { prisma } from "@/prisma";
import { createProblemIds } from "../../db/createProblemIds";
import type { AojProblem } from "../Problem";

export async function createAojProblems(
	problems: AojProblem[],
): Promise<AojProblem[]> {
	const newProblemIds = await createProblemIds(problems.length);
	await prisma.aojProblem.createMany({
		data: problems.map((problem, index) => ({
			commonProblemId: newProblemIds[index],
			...problem.Unpack(),
		})),
	});
	return problems;
}
