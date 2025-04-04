import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProblemSet = async (name: string, authorId: string, description: string, isPublic: boolean) => {
    const newProblemSet = await prisma.problemSet.create({
        data: {
            name,
            authorId,
            description,
            isPublic,
        },
    });
    return newProblemSet;
}

export const getProblemSetById = async (id: number) => {
    const problemSet = await prisma.problemSet.findUnique({
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
            problemSetProblems: {
                select: {
                    problem: {
                        select: {
                            id: true,
                            provider: true,
                            contestId: true,
                            problemId: true,
                            title: true,
                            difficulty: true,
                        }
                    },
                    memo: true,
                    hint: true,
                    order: true,
                }
            },
            stars: {
                select: {
                    id: true,
                }
            },
            isPublic: true,
            createdAt: true,
            updatedAt: true,
        },
        where: {
            id: id,
        }
    });
    return problemSet;
}