import { prisma } from "@/prisma";
import { createProblemIds } from "../../db/createProblemIds";
import type { CodeforcesProblem } from "../Problem";

export async function createCodeforcesProblems(
	problems: CodeforcesProblem[],
): Promise<CodeforcesProblem[]> {
	const ids = await createProblemIds(problems.length);
	await prisma.codeforcesProblem.createMany({
		data: problems.map((problem, index) => ({
			commonProblemId: ids[index],
			...problem.Unpack(),
		})),
	});
	return problems;
}
