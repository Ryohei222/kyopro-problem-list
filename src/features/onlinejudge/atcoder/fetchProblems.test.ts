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
			if (problem.difficulty !== undefined) {
				expect(problem.difficulty).toBeGreaterThanOrEqual(0);
			}
		}
	});
});
