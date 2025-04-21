import { prisma } from "@/prisma";

export async function createProblemIds(count: number) {
	const createdProblemIds = await prisma.problem.createManyAndReturn({
		data: [...new Array(count).keys()].map(() => ({})),
	});
	return createdProblemIds.map((problem) => problem.id);
}
