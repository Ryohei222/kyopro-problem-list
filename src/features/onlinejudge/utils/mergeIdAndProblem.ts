import type { CommonProblem } from "@/types/CommonProblem";

export function mergeIdsAndProblems<T extends CommonProblem>(
	problemIds: number[],
	problems: T[],
) {
	if (problemIds.length !== problems.length) {
		throw new Error("problemIds and problems must have the same length");
	}
	const merged = problemIds.map((problemId, index) => {
		return {
			commonProblemId: problemId,
			problem: problems[index],
		};
	});
	return merged;
}
