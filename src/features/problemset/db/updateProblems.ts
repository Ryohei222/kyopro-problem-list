import { APIProblem, CreatedProblem } from "../types/Problem";
import { prisma } from "@/prisma";

export default async function updateProblems(problems: APIProblem[]): Promise<CreatedProblem[]> {
    const dbProblems = await prisma.problem.findMany({
        select: {
            provider: true,
            contestId: true,
            problemId: true,
            title: true,
        },
    });

    const dbProblemSet = new Set(dbProblems);

    const createdProblems = await prisma.problem.createManyAndReturn({
        data: problems.filter((problem) => !dbProblemSet.has(problem)),
    });

    return createdProblems;
}
