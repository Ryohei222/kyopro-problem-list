import { auth } from "@/lib/auth";
import { prisma } from "@/prisma";

export const createStar = async (problemListId: string, userId: string) => {
    const star = await prisma.star.create({
        data: {
            problemListId: problemListId,
            userId: userId,
        },
    });
    return star;
};

export const deleteStar = async (problemListId: string, userId: string) => {
    const star = await prisma.star.delete({
        where: {
            star_identifier: {
                problemListId: problemListId,
                userId: userId,
            },
        },
    });
    return star;
};

export const getStar = async (problemListId: string, userId: string) => {
    const session = await auth();
    if (!session?.user?.id || session.user.id !== userId) {
        return null;
    }
    const star = await prisma.star.findUnique({
        where: {
            star_identifier: {
                problemListId: problemListId,
                userId: userId,
            },
        },
    });
    return star;
};

export const getUserStars = async (userId: string) => {
    const stars = await prisma.star.findMany({
        where: {
            userId: userId,
        },
        include: {
            problemList: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return stars;
};
