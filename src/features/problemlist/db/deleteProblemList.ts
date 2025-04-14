"use server";

import { prisma } from "@/prisma";
import type { RequestedUserId } from "@/types/RequestedUserId";
import { withAuthorization } from "@/utils/withAuthorization";

async function _deleteProblemList(
	requestedUserId: RequestedUserId,
	problemListId: string,
) {
	const problemList = await prisma.problemList.findUnique({
		where: {
			id: problemListId,
		},
	});
	if (!problemList) {
		return "Problem list not found";
	}
	if (problemList.authorId !== requestedUserId) {
		return "You are not authorized to delete this problem list";
	}

	await prisma.problemListRecord.deleteMany({
		where: {
			problemListId: problemListId,
		},
	});

	await prisma.star.deleteMany({
		where: {
			problemListId: problemListId,
		},
	});

	const deletedProblemList = await prisma.problemList.delete({
		where: {
			id: problemListId,
		},
	});
	return deletedProblemList;
}

export const deleteProblemList = withAuthorization(_deleteProblemList);
