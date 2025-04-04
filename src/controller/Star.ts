import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createStar = async (problemSetId: number, userId: string) => {
    const star = await prisma.star.create({
        data: {
            problemSetId: problemSetId,
            userId: userId,
        }
    });
    return star;
}

export const deleteStar = async (problemSetId: number, userId: string) => {
    const star = await prisma.star.delete({
        where: {
            star_identifier: {
                problemSetId: problemSetId,
                userId: userId,
            }
        }
    });
    return star;
}

export const getUserStars = async (userId: string) => {
    const stars = await prisma.star.findMany({
        where: {
            userId: userId,
        },
        include: {
            problemSet: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });
    return stars;
}