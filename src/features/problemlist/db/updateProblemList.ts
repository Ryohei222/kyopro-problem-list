"use server";

import { prisma } from "@/prisma";
import { createProblemKey } from "@/types/CommonProblem";
import type { RequestedUserId } from "@/types/RequestedUserId";
import { withAuthorization } from "@/utils/withAuthorization";
import {
	ProblemListSchema,
	type ProblemListSchemaType,
} from "../types/ProblemListSchema";
import { getProblemList } from "./getProblemList";

async function _updateProblemList(
	requestedUserId: RequestedUserId,
	props: ProblemListSchemaType,
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

	const updatedProblemSet = await prisma.problemList.update({
		where: { id: problemListId },
		data: {
			name,
			description,
			isPublic,
		},
	});

	const newProblemIds = await prisma.problem.findMany({
		where: {
			problemId: {
				in: problemListRecords.map((record) => record.problemId),
			},
		},
	});

	await prisma.problemListRecord.deleteMany({
		where: {
			problemListId,
		},
	});

	const problemMap = new Map<string, number>(
		newProblemIds.map((problem) => {
			return [createProblemKey(problem), problem.id];
		}),
	);

	const problemsToCreate = problemListRecords.flatMap((problemData) => {
		const innerId = problemMap.get(
			createProblemKey({
				...problemData,
			}),
		);
		if (!innerId) {
			return [];
		}
		return {
			problemListId,
			problemId: innerId,
			memo: problemData.memo,
			hint: problemData.hint,
			order: problemData.order,
		};
	});

	await prisma.problemListRecord.createMany({
		data: problemsToCreate,
	});

	return {
		success: true,
		problemListId: updatedProblemSet.id,
	};
}

export const updateProblemList = withAuthorization(_updateProblemList);
