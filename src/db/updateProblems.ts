import { prisma } from "@/prisma";
import type { CommonProblem, CreatedProblem } from "@/types/CommonProblem";
import { createProblemKey } from "@/types/CommonProblem";

export default async function updateProblems(
	problems: CommonProblem[],
): Promise<CreatedProblem[]> {
	const dbProblems = await prisma.problem.findMany({
		select: {
			id: true,
			resource: true,
			contestId: true,
			problemId: true,
			name: true,
			contestName: true,
			difficulty: true,
		},
	});

	const dbProblemMap = new Map(
		dbProblems.map((problem) => [createProblemKey(problem), problem]),
	);

	const createdProblems = await prisma.problem.createManyAndReturn({
		data: problems.filter(
			(problem) => !dbProblemMap.has(createProblemKey(problem)),
		),
	});

	const updatedProblems = await prisma.$transaction(
		problems
			.map((problem) => {
				const dbProblem = dbProblemMap.get(createProblemKey(problem));
				if (
					!dbProblem ||
					!(
						dbProblem.name !== problem.name ||
						dbProblem.difficulty !== problem.difficulty ||
						dbProblem.contestName !== problem.contestName
					)
				) {
					return false;
				}

				return prisma.problem.update({
					where: { id: dbProblem.id },
					data: {
						name: problem.name,
						difficulty: problem.difficulty,
						contestName: problem.contestName,
					},
				});
			})
			.filter((problem) => problem !== false),
	);

	return [...createdProblems, ...updatedProblems];
}
