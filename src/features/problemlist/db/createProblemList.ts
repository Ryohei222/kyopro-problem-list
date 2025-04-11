"use server";

import { prisma } from "@/prisma";
import { withAuthorization } from "@/utils/withAuthorization";
import { RequestedUserId } from "@/types/RequestedUserId";
import {
    CreateProblemListFormSchema,
    CreateProblemListFormSchemaType,
} from "../types/CreateProblemListFormSchema";

async function _createProblemList(
    requestedUserId: RequestedUserId,
    formData: CreateProblemListFormSchemaType,
) {
    const result = CreateProblemListFormSchema.safeParse(formData);
    if (!result.success) {
        console.error("Validation error:", result.error.format());
        return "format error";
    }
    console.log(result.data);
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
