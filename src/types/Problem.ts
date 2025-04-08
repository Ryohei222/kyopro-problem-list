import { Resource } from "@prisma/client";
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type APIProblem = {
    resource: Resource;
    contestId: string;
    problemId: string;
    name: string;
};

const problemKeyBrand = Symbol();

export type ProblemKey = string & { [problemKeyBrand]: unknown };

export function createProblemKey(problem: Omit<APIProblem, "name">): ProblemKey {
    return `${problem.resource}-${problem.contestId}-${problem.problemId}` as ProblemKey;
}

type CreatedProblem = NonNullable<Prisma.PromiseReturnType<typeof prisma.problem.findFirst>>;

export type { APIProblem, CreatedProblem };
