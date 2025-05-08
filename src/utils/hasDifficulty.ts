import type { CommonDifficulty } from "@/types/CommonDifficulty";

export function hasDifficulty(problem: unknown): problem is CommonDifficulty {
	return (problem as CommonDifficulty).Difficulty !== undefined;
}
