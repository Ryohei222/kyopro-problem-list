import type { CommonProblem } from "@/types/CommonProblem";

export interface FetchProblems<T extends CommonProblem> {
	fetchProblems: () => Promise<T[]>;
}
