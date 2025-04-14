"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import type { RequestedUserId } from "@/types/RequestedUserId";
import { withAuthorization } from "@/utils/withAuthorization";

const _createStar = async (
	requestedUserId: RequestedUserId,
	problemListId: string,
) => {
	const star = await prisma.star.create({
		data: {
			problemListId: problemListId,
			userId: requestedUserId,
		},
	});
	return star;
};

const _deleteStar = async (
	requestedUserId: RequestedUserId,
	problemListId: string,
) => {
	const star = await prisma.star.delete({
		where: {
			star_identifier: {
				problemListId: problemListId,
				userId: requestedUserId,
			},
		},
	});
	return star;
};

export const createStar = withAuthorization(_createStar);
export const deleteStar = withAuthorization(_deleteStar);

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
