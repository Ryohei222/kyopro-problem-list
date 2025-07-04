import { prisma } from "@/prisma";

export const getProblemList = async (problemListId: string) => {
	const problemSet = await prisma.problemList.findUnique({
		select: {
			id: true,
			name: true,
			author: {
				select: {
					id: true,
					name: true,
					image: true,
				},
			},
			description: true,
			problemListRecords: {
				select: {
					problem: {
						include: {
							AojProblem: {},
							AtcoderProblem: {},
							CodeforcesProblem: {},
							MofeProblem: {},
							YukicoderProblem: {},
						},
					},
					memo: true,
					hint: true,
					order: true,
				},
			},
			stars: {
				select: {
					id: true,
				},
			},
			isPublic: true,
			createdAt: true,
			updatedAt: true,
		},
		where: {
			id: problemListId,
		},
	});
	if (!problemSet) {
		return undefined;
	}
	const problemListRecords = problemSet.problemListRecords.map((record) => {
		const problem = record.problem;
		return {
			problem: problem,
			memo: record.memo,
			hint: record.hint,
			order: record.order,
		};
	});
	return { ...problemSet, problemListRecords };
};
