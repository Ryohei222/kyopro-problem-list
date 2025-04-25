import { beforeAll, describe, expect, test } from "vitest";
import type { CodeforcesProblem } from "./Problem";
import { fetchCodeforcesProblems } from "./fetchProblems";

let problems: CodeforcesProblem[] = [];

beforeAll(async () => {
	problems = await fetchCodeforcesProblems();
});

describe("fetchCodeforcesProblems", () => {
	test("should fetch problems successfully", async () => {
		expect(problems).toBeDefined();
		expect(problems.length).toBeGreaterThan(0);
	});
	test("problem 2089A exists", () => {
		const problem = problems.find((p) => p.Url().includes("2089/problem/A"));
		if (!problem) {
			throw new Error("Problem 2089A not found");
		}
		expect(problem.Title()).toBe("Simple Permutation");
		expect(problem.Url()).toBe("https://codeforces.com/contest/2089/problem/A");
		expect(problem.ContestTitle()).toBe("Codeforces Round 1012 (Div. 1)");
		expect(problem.ContestUrl()).toBe("https://codeforces.com/contest/2089");
	});
});
