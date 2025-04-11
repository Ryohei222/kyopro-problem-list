"use server";

import { prisma } from "@/prisma";
import { createProblemKey } from "@/types/Problem";
import { Resource } from "@prisma/client";
import { getProblemList } from "./getProblemList";
import { RequestedUserId } from "@/types/RequestedUserId";
import { withAuthorization } from "@/utils/withAuthorization";

export type UpdateProblemListProps = {
    id: string;
    name: string;
    description: string;
    isPublic: boolean;
    problemListRecords: {
        resource: Resource;
        contestId: string;
        problemId: string;
        memo: string;
        hint: string;
        order: number;
    }[];
};

async function _updateProblemList(
    requestedUserId: RequestedUserId,
    updateProblemListProps: UpdateProblemListProps,
) {
    const {
        id: problemListId,
        name,
        description,
        isPublic,
        problemListRecords,
    } = updateProblemListProps;

    const existingProblemList = await getProblemList(problemListId);

    if (!existingProblemList) {
        return { success: false, error: "Problem list not found" };
    }
    if (existingProblemList.author.id !== requestedUserId) {
        return { success: false, error: "You are not the author of this problem list" };
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
