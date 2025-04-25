import { prisma } from "@/prisma";
import type { ProblemKey } from "@/types/CommonProblem";

export async function getProblemIdsByKeys(problemKeys: ProblemKey[]) {
	const problemIds = await prisma.problem.findMany({
		where: {
			problemKey: {
				in: problemKeys,
			},
		},
		select: {
			id: true,
			problemKey: true,
		},
	});
	return new Map<ProblemKey, number>(
		problemIds.map((problem) => [problem.problemKey as ProblemKey, problem.id]),
	);
}
