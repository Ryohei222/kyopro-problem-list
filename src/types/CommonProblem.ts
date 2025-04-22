import type { AojProblem } from "@/features/onlinejudge/aoj/Problem";
import type { AtcoderProblem } from "@/features/onlinejudge/atcoder/Problem";
import type { CodeforcesProblem } from "@/features/onlinejudge/codeforces/Problem";
import type { MofeProblem } from "@/features/onlinejudge/mofe/Problem";
import type { YukicoderProblem } from "@/features/onlinejudge/yukicoder/Problem";
import type { prisma } from "@/prisma";
import type { Resource } from "@prisma/client";
import type { Prisma } from "@prisma/client";

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

export interface CommonProblem {
	readonly resource: Resource;
	Title(): string;
	Url(): string;
	ProblemKey(): ProblemKey;
	Stringify(): string;
	Equals(other: CommonProblem): boolean;
}

export type OnlineJudgeProblem =
	| AojProblem
	| AtcoderProblem
	| CodeforcesProblem
	| MofeProblem
	| YukicoderProblem;
