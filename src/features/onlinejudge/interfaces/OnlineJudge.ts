import type { CommonProblem } from "./CommonProblem";
import type { CommonSubmission } from "./CommonSubmission";

export interface OnlineJudge {
	fetchProblems: () => Promise<CommonProblem[]>;
	fetchSubmissions?: (userId: string) => Promise<CommonSubmission[]>;
}
