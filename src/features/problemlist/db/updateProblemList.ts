"use server";

import { getProblemIdsByKeys } from "@/features/onlinejudge/db/getProblemIdsByKeys";
import { prisma } from "@/prisma";
import type { ProblemKey } from "@/types/CommonProblem";
import type { RequestedUserId } from "@/types/RequestedUserId";
import { withAuthorization } from "@/utils/withAuthorization";
import { ProblemListSchema } from "../types/ProblemListSchema";
import { getProblemList } from "./getProblemList";

type updateProblemListProps = {
	id: string;
	name: string;
	description: string;
	isPublic: boolean;
	problemListRecords: {
		problemKey: ProblemKey;
		memo: string;
		hint: string;
		order: number;
	}[];
};

async function _updateProblemList(
	requestedUserId: RequestedUserId,
	props: updateProblemListProps,
) {
	const result = ProblemListSchema.safeParse(props);

	if (!result.success) {
		console.error("Validation error:", result.error.format());
		return { success: false, error: "format error" };
	}

	const {
		id: problemListId,
		name,
		description,
		isPublic,
		problemListRecords,
	} = result.data;

	const problemOrderSet = new Set(
		problemListRecords.map((record) => record.order),
	);

	for (let i = 1; i <= problemListRecords.length; i++) {
		if (!problemOrderSet.has(i)) {
			return { success: false, error: "order is not unique or not in range" };
		}
	}

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
		problemListRecords.map((record) => record.problemKey as ProblemKey),
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
				problemId: newProblemIds.get(record.problemKey as ProblemKey) ?? -1,
				memo: record.memo,
				hint: record.hint,
				order: record.order,
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
