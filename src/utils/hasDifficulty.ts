import type { GetDifficulty } from "@/types/GetDifficulty";

export function hasDifficulty(problem: unknown): problem is GetDifficulty {
	return (problem as GetDifficulty).Difficulty !== undefined;
}
