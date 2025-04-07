import { prisma } from "@/prisma";

export async function getStaredProblemSets(userId: string) {
    const problemSets = await prisma.problemSet.findMany({
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
                    problemSetProblems: true,
                },
            },
            isPublic: true,
            createdAt: true,
            updatedAt: true,
        },
        where: {
            stars: {
                every: {
                    userId: userId,
                },
            },
        },
    });
    const filteredProblemSets = problemSets.filter((problemSet) => {
        return (
            problemSet.stars.filter((star) => star.userId === userId).length > 0 &&
            (problemSet.isPublic || problemSet.author.id === userId)
        );
    });
    return filteredProblemSets;
}
