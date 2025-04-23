import type { OnlineJudgeProblem } from "@/types/CommonProblem";
import { beforeAll, describe, expect, test } from "vitest";
import { fetchProblems } from "./fetchProblems";

const problems: OnlineJudgeProblem[] = [];

beforeAll(async () => {
	problems.push(...(await fetchProblems()));
});

describe("Fetch Problems", () => {
	test("Problems should be fetched", () => {
		expect(problems.length).toBeGreaterThan(0);
	});
	test("Should have unique problem keys", () => {
		const problemKeys = new Set(
			problems.map((problem) => problem.ProblemKey()),
		);
		expect(problemKeys.size).toBe(problems.length);
	});
});
