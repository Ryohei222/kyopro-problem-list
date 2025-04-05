import { prisma } from "@/prisma";

export async function getPublicProblemSets() {
    const problemSets = await prisma.problemSet.findMany({
        select: {
            id: true,
            name: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            description: true,
            _count: {
                select: {
                    stars: true,
                    problemSetProblems: true,
                }
            },
            isPublic: true,
            createdAt: true,
            updatedAt: true,
        },
        where: {
            isPublic: true,
        }
    });
    return problemSets;
}