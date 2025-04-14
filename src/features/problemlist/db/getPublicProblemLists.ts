import { prisma } from "@/prisma";

export async function getPublicProblemLists() {
	const problemLists = await prisma.problemList.findMany({
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
			_count: {
				select: {
					stars: true,
					problemListRecords: true,
				},
			},
			isPublic: true,
			createdAt: true,
			updatedAt: true,
		},
		where: {
			isPublic: true,
			problemListRecords: {
				some: {
					problem: {},
				},
			},
		},
	});
	return problemLists;
}
