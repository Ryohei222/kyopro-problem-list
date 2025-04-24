import { beforeAll, describe, expect, test } from "vitest";
import type { YukicoderProblem } from "./Problem";
import { fetchYukicoderProblems } from "./fetchProblems";

let problems: YukicoderProblem[] = [];
beforeAll(async () => {
	problems = await fetchYukicoderProblems();
});

describe("fetchYukicoderProblems", () => {
	test("should fetch problems successfully", async () => {
		expect(problems).toBeDefined();
		expect(problems.length).toBeGreaterThan(0);
	});
	test("problem 46 exists", () => {
		const problem = problems.find((p) => p.Url().includes("/46"));
		if (!problem) {
			throw new Error("Problem 46 not found");
		}
		expect(problem.Title()).toBe("はじめのn歩");
		expect(problem.Url()).toBe("https://yukicoder.me/problems/no/46");
	});
});
