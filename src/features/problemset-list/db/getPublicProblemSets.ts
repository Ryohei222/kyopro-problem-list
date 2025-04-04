import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPublicProblemSets = async () => {
    // Fetch all problem sets with isPublic = true
    const problemSets = await prisma.problemSet.findMany({
        select: {
            id: true,
            name: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },
            description: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    stars: true,
                }
            }
        },
        where: {
            isPublic: true
        }
    });
    return problemSets;
}