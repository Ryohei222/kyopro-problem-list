import type { CommonProblem } from "@/types/CommonProblem";
import type { ProblemWithCommonId } from "./ProblemWithCommonId";

export interface ReadProblems<T extends CommonProblem> {
	readProblems: () => Promise<ProblemWithCommonId<T>[]>;
}
