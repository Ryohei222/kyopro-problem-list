import { ProblemProvider } from "@prisma/client";
import { CreatedProblem } from "../types/Problem";
import { z } from "zod";
import { prisma } from "@/prisma";

export default async function updateYukicoderProblems(): Promise<CreatedProblem[]> {
    const URL = "https://yukicoder.me/api/v1/problems";

    const YukicoderProblemSchema = z.object({
        No: z.number().nullable(),
        ProblemId: z.number(),
        Title: z.string(),
        AuthorId: z.number(),
        TesterIds: z.string(),
        Level: z.number(),
        ProblemType: z.number(),
        Tags: z.string(),
        Date: z.string().nullable()
    });

    const YukicoderProblemsSchema = z.array(YukicoderProblemSchema);

    const res = await fetch(URL)
        .then((res) => res.json())
        .then(YukicoderProblemsSchema.safeParse);
    if (!res.success) {
        console.error("Failed to fetch or parse data:", res.error);
        return [];
    }
    const problems = res.data;
    const createdProblems = await prisma.problem.createManyAndReturn({
        data: problems.map((problem) => ({
            provider: ProblemProvider.YUKICODER,
            contestId: "0", // Yukicoder does not have contestId
            problemId: problem.ProblemId.toString(),
            title: problem.Title,
        })),
        skipDuplicates: true,
    });
    return createdProblems;
}
