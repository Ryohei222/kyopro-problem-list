import { ProblemProvider } from "@prisma/client";
import { CreatedProblem } from "../types/Problem";
import { z } from "zod";
import { prisma } from "@/prisma";

export default async function updateAOJProblems(): Promise<CreatedProblem[]> {
    const URL = "https://judgeapi.u-aizu.ac.jp/problems?size=100000";

    const AOJProblemSchema = z.object({
        id: z.string(),
        available: z.number(),
        doctype: z.number(),
        name: z.string(),
        problemTimeLimit: z.number(),
        problemMemoryLimit: z.number(),
        maxScore: z.number(),
        solvedUser: z.number(),
        submissions: z.number(),
        recommendations: z.number(),
        isSolved: z.boolean(),
        bookmark: z.boolean(),
        recommend: z.boolean(),
        successRate: z.number(),
        score: z.number(),
        userScore: z.number(),
    });

    const AOJProblemsSchema = z.array(AOJProblemSchema);

    const res = await fetch(URL)
        .then((res) => res.json())
        .then(AOJProblemsSchema.safeParse);
    if (!res.success) {
        console.error("Failed to fetch or parse data:", res.error);
        return [];
    }
    const problems = res.data;
    const createdProblems = await prisma.problem.createManyAndReturn({
        data: problems.map((problem) => ({
            provider: ProblemProvider.AOJ,
            contestId: "0", // AOJ does not have contestId
            problemId: problem.id,
            title: problem.name,
        })),
        skipDuplicates: true,
    });
    return createdProblems;
}
