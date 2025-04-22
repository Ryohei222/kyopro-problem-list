import { prisma } from "@/prisma";

export async function createProblemIds(count: number) {
	const existingProblems = await prisma.problem.findMany({});
	const maxProblemId = Math.max(
		...existingProblems.map((problem) => problem.id),
		0,
	);
	const createdProblemIds = await prisma.problem.createManyAndReturn({
		data: [...new Array(count).keys()].map((i) => ({
			id: maxProblemId + i + 1,
		})),
	});
	return createdProblemIds.map((problem) => problem.id);
}
