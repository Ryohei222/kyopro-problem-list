import type { CommonProblem } from "./CommonProblem";

export interface OnlineJudge {
	getProblems: () => Promise<CommonProblem[]>;
}
