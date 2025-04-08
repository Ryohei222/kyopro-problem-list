import { prisma } from "@/prisma";

export async function getUserProblemList(authorId: string, needPublic: boolean) {
    const problemSets = await prisma.problemList.findMany({
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
        where: needPublic
            ? {
                  authorId: authorId,
                  isPublic: true,
              }
            : {
                  authorId: authorId,
              },
    });
    return problemSets;
}
