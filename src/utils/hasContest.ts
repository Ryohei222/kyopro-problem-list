import type { CommonContest } from "@/types/CommonContest";
export function hasContest(problem: unknown): problem is CommonContest {
	return (
		(problem as CommonContest).ContestTitle !== undefined &&
		(problem as CommonContest).ContestUrl !== undefined
	);
}
