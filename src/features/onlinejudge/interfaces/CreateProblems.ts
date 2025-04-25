import type { CommonProblem } from "@/types/CommonProblem";
import type { ProblemWithCommonId } from "./ProblemWithCommonId";

export interface CreateProblems<T extends CommonProblem> {
	createProblems: (problems: ProblemWithCommonId<T>[]) => Promise<void>;
}
