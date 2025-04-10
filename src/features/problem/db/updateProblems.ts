import { CommonProblem, CreatedProblem } from "@/types/Problem";
import { prisma } from "@/prisma";
import { createProblemKey } from "@/types/Problem";

export default async function updateProblems(problems: CommonProblem[]): Promise<CreatedProblem[]> {
    const dbProblems = await prisma.problem.findMany({
        select: {
            resource: true,
            contestId: true,
            problemId: true,
            name: true,
        },
    });

    const dbProblemSet = new Set(dbProblems.map((problem) => createProblemKey(problem)));

    const createdProblems = await prisma.problem.createManyAndReturn({
        data: problems.filter((problem) => !dbProblemSet.has(createProblemKey(problem))),
    });

    return createdProblems;
}
