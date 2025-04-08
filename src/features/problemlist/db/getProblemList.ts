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
                        select: {
                            resource: true,
                            contestId: true,
                            problemId: true,
                            name: true,
                            difficulty: true,
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
    return problemSet;
};
