import { prisma } from "@/prisma";
import { createProblemIds } from "../../db/createProblemIds";
import type { AtcoderProblem } from "../Problem";

export async function createAtcoderProblems(
	problems: AtcoderProblem[],
): Promise<AtcoderProblem[]> {
	const newIds = await createProblemIds(problems.length);
	await prisma.atcoderProblem.createMany({
		data: problems.map((problem, index) => ({
			commonProblemId: newIds[index],
			...problem.Unpack(),
		})),
	});
	return problems;
}
