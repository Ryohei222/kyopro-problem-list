import type { CommonProblem } from "@/types/CommonProblem";

export type ProblemWithCommonId<T extends CommonProblem> = {
	commonProblemId: number;
	problem: T;
};
