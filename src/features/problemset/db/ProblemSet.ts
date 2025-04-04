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