import type { CommonProblem } from "@/types/CommonProblem";
import type { ProblemWithCommonId } from "./ProblemWithCommonId";

export interface UpdateProblems<T extends CommonProblem> {
	updateProblems: (
		problemWithCommonIds: ProblemWithCommonId<T>[],
	) => Promise<void>;
}
