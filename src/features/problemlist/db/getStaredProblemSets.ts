import { prisma } from "@/prisma";

export async function getStarredProblemLists(userId: string) {
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
			stars: true,
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
	});
	const filteredProblemLists = problemLists.filter((problemList) => {
		return (
			problemList.stars.filter((star) => star.userId === userId).length > 0 &&
			(problemList.isPublic || problemList.author.id === userId)
		);
	});
	return filteredProblemLists;
}
