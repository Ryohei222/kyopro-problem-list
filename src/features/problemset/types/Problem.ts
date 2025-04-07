import { ProblemProvider } from "@prisma/client";
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type APIProblem = {
    provider: ProblemProvider;
    contestId: string;
    problemId: string;
    title: string;
};

const problemKeyBrand = Symbol();

export type ProblemKey = string & { [problemKeyBrand]: unknown };

export function createProblemKey(problem: APIProblem): ProblemKey {
    return `${problem.provider}-${problem.contestId}-${problem.problemId}` as ProblemKey;
}

type CreatedProblem = NonNullable<Prisma.PromiseReturnType<typeof prisma.problem.findFirst>>;

export type { APIProblem, CreatedProblem };
