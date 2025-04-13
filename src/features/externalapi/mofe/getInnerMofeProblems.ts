"use server";

import { prisma } from "@/prisma";
import { CommonProblem } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";

export async function getInnerMofeProblems(): Promise<CommonProblem[]> {
    return prisma.problem.findMany({
        select: {
            resource: true,
            contestId: true,
            problemId: true,
            name: true,
            difficulty: true,
            contestName: true,
        },
        where: {
            resource: Resource.MOFE,
        },
    });
}
