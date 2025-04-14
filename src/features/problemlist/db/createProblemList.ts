"use server";

import { prisma } from "@/prisma";
import type { RequestedUserId } from "@/types/RequestedUserId";
import { withAuthorization } from "@/utils/withAuthorization";
import {
	ProblemListMetadataSchema,
	type ProblemListMetadataSchemaType,
} from "../types/ProblemListMetadataSchema";

async function _createProblemList(
	requestedUserId: RequestedUserId,
	formData: ProblemListMetadataSchemaType,
) {
	const result = ProblemListMetadataSchema.safeParse(formData);
	if (!result.success) {
		console.error("Validation error:", result.error.format());
		return "format error";
	}
	const newProblemListData = result.data;
	const problemList = await prisma.problemList.create({
		data: {
			...newProblemListData,
			authorId: requestedUserId,
		},
	});
	return problemList;
}

export const createProblemList = withAuthorization(_createProblemList);
