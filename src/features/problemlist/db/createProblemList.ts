"use server";

import { prisma } from "@/prisma";
import { withAuthorization } from "@/utils/withAuthorization";
import { RequestedUserId } from "@/types/RequestedUserId";

async function _createProblemList(
    requestedUserId: RequestedUserId,
    name: string,
    description: string,
) {
    const problemList = await prisma.problemList.create({
        data: {
            name,
            description,
            authorId: requestedUserId,
        },
    });
    return problemList;
}

export const createProblemList = withAuthorization(_createProblemList);
