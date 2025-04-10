"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { createProblemKey } from "@/types/Problem";
import { Resource } from "@prisma/client";
import { getProblemList } from "./getProblemList";

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

export async function updateProblemList(updateProblemListProps: UpdateProblemListProps) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        const {
            id: problemListId,
            name,
            description,
            isPublic,
            problemListRecords,
        } = updateProblemListProps;

        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        console.log(updateProblemListProps);

        const existingProblemList = await getProblemList(problemListId);

        if (!existingProblemList) {
            return { success: false, error: "Problem list not found" };
        }
        if (existingProblemList.author.id !== userId) {
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

        console.log("New problem IDs:", newProblemIds);

        const problemMap = new Map<string, number>(
            newProblemIds.map((problem) => {
                return [createProblemKey(problem), problem.id];
            }),
        );

        console.log("Problem map:", problemMap);

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

        console.log("Problems to create:", problemsToCreate);

        await prisma.problemListRecord.createMany({
            data: problemsToCreate,
        });
        return {
            success: true,
            problemListId: updatedProblemSet.id,
        };
    } catch (error) {
        console.error("Error updating problem list:", error);
        return {
            success: false,
            error: "Failed to update problem set",
        };
    }
}
