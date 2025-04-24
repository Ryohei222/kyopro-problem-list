import { prisma } from "@/prisma";
import type { CommonProblem, ProblemKey } from "@/types/CommonProblem";

export async function createProblemIds(
	problems: CommonProblem[],
): Promise<Map<ProblemKey, number>> {
	const existingProblems = await prisma.problem.findMany({});
	const maxProblemId = Math.max(
		...existingProblems.map((problem) => problem.id),
		0,
	);
	await prisma.problem.createManyAndReturn({
		data: [...new Array(problems.length).keys()].map((i) => ({
			id: maxProblemId + i + 1,
			problemKey: problems[i].ProblemKey(),
		})),
	});
	return new Map<ProblemKey, number>(
		[...new Array(problems.length).keys()].map((i) => [
			problems[i].ProblemKey(),
			maxProblemId + i + 1,
		]),
	);
}
