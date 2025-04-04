import { ProblemProvider } from "@prisma/client";
import { CreatedProblem } from "../types/Problem";
import { z } from "zod";
import { prisma } from "@/prisma";

export default async function updateCodeforcesProblems(): Promise<CreatedProblem[]> {
    const URL = "https://codeforces.com/api/problemset.problems";
    const ProblemSchema = z.object({
        contestId: z.number(),
        index: z.string(),
        name: z.string(),
        type: z.string(),
        points: z.number().optional(),
        rating: z.number().optional(),
        tags: z.array(z.string()),
    });

    const ProblemStatisticSchema = z.object({
        contestId: z.number(),
        index: z.string(),
        solvedCount: z.number(),
    });

    const ApiResponseSchema = z.object({
        status: z.string(),
        result: z.object({
            problems: z.array(ProblemSchema),
            problemStatistics: z.array(ProblemStatisticSchema),
        }),
    });

    const res = await fetch(URL)
        .then((res) => res.json())
        .then(ApiResponseSchema.safeParse);
    if (!res.success) {
        console.error("Failed to fetch or parse data:", res.error);
        return [];
    }
    const problems = res.data.result.problems;

    const createdProblems = await prisma.problem.createManyAndReturn({
        data: problems.map((problem) => ({
            provider: ProblemProvider.CODEFORCES,
            contestId: problem.contestId.toString(),
            problemId: problem.index,
            title: problem.name,
        })),
        skipDuplicates: true,
    });
    return createdProblems;
}