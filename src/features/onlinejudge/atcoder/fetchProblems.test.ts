import { beforeAll, describe, expect, test } from "vitest";
import type { AtcoderProblem } from "./Problem";
import { fetchAtcoderProblems } from "./fetchProblems";

let problems: AtcoderProblem[] = [];

beforeAll(async () => {
	problems = await fetchAtcoderProblems();
	return problems;
});

describe("fetchAtcoderProblems", () => {
	test("should fetch problems successfully", async () => {
		expect(problems).toBeDefined();
		expect(problems.length).toBeGreaterThan(0);
	});
	test("difficulty should be greater than or equal to 0 or undefined", () => {
		for (const problem of problems) {
			if (problem.Difficulty() !== undefined) {
				expect(problem.Difficulty()).toBeGreaterThanOrEqual(0);
			}
		}
	});
	test("problem abc123_a exists", () => {
		const problem = problems.find((p) => p.Url().includes("abc123_a"));
		if (!problem) {
			throw new Error("Problem abc123_a not found");
		}
		expect(problem.Title()).toBe("Five Antennas");
		expect(problem.ContestTitle()).toBe("AtCoder Beginner Contest 123");
		expect(problem.Difficulty()).toBe(31);
	});
});
