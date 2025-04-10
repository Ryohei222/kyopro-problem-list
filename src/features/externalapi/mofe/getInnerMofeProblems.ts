"use server";

import { prisma } from "@/prisma";
import { CommonProblem } from "@/types/Problem";
import { Resource } from "@prisma/client";

export async function getInnerMofeProblems(): Promise<CommonProblem[]> {
    return await prisma.problem.findMany({
        select: {
            resource: true,
            contestId: true,
            problemId: true,
            name: true,
        },
        where: {
            resource: Resource.MOFE,
        },
    });
}
