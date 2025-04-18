import type { prisma } from "@/prisma";
import type { Resource } from "@prisma/client";
import type { Prisma } from "@prisma/client";

type CommonProblem = {
	resource: Resource;
	contestId: string;
	problemId: string;
	name: string;
	difficulty: number | null;
	contestName: string | null;
};

const problemKeyBrand = Symbol();

export type ProblemKey = string & { [problemKeyBrand]: unknown };

export type createProblemKeyProps = {
	resource: Resource;
	contestId: string;
	problemId: string;
};

export function createProblemKey(problem: createProblemKeyProps): ProblemKey {
	return `${problem.resource}-${problem.contestId}-${problem.problemId}` as ProblemKey;
}

type CreatedProblem = NonNullable<
	Prisma.PromiseReturnType<typeof prisma.problem.findFirst>
>;

export type { CommonProblem, CreatedProblem };
