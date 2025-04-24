"use server";

import { getProblemIdsByKeys } from "@/features/onlinejudge/db/getProblemIdsByKeys";
import { prisma } from "@/prisma";
import type { CommonProblem } from "@/types/CommonProblem";
import type { RequestedUserId } from "@/types/RequestedUserId";
import { withAuthorization } from "@/utils/withAuthorization";
import { getProblemList } from "./getProblemList";

type updateProblemListProps = {
	id: string;
	name: string;
	description: string;
	isPublic: boolean;
	problemListRecords: {
		problem: CommonProblem;
		memo: string;
		hint: string;
		order: number;
	}[];
};

async function _updateProblemList(
	requestedUserId: RequestedUserId,
	props: updateProblemListProps,
) {
	// Zod validation
	// const result = ProblemListSchema.safeParse(props);

	// if (!result.success) {
	// 	console.error("Validation error:", result.error.format());
	// 	return { success: false, error: "format error" };
	// }

	// const {
	// 	id: problemListId,
	// 	name,
	// 	description,
	// 	isPublic,
	// 	problemListRecords,
	// } = result.data;

	const {
		id: problemListId,
		name,
		description,
		isPublic,
		problemListRecords,
	} = props;

	const existingProblemList = await getProblemList(problemListId);

	if (!existingProblemList) {
		return { success: false, error: "Problem list not found" };
	}
	if (existingProblemList.author.id !== requestedUserId) {
		return {
			success: false,
			error: "You are not the author of this problem list",
		};
	}

	const newProblemIds = await getProblemIdsByKeys(
		problemListRecords.map((record) => record.problem.ProblemKey()),
	);

	return await prisma.$transaction(async () => {
		const updatedProblemSet = await prisma.problemList.update({
			where: { id: problemListId },
			data: {
				name,
				description,
				isPublic,
			},
		});

		await prisma.problemListRecord.deleteMany({
			where: {
				problemListId,
			},
		});

		const problemsToCreate = problemListRecords.flatMap((record) => {
			return {
				problemListId,
				problemId: newProblemIds.get(record.problem.ProblemKey()) ?? -1,
				...record,
			};
		});

		await prisma.problemListRecord.createMany({
			data: problemsToCreate,
		});

		return {
			success: true,
			problemListId: updatedProblemSet.id,
		};
	});
}

export const updateProblemList = withAuthorization(_updateProblemList);
