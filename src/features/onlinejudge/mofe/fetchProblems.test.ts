import { beforeAll, describe, expect, test } from "vitest";
import type { MofeProblem } from "./Problem";
import { fetchMofeProblems } from "./fetchMofeProblems";

let problems: MofeProblem[] = [];

beforeAll(async () => {
	problems = await fetchMofeProblems();
}, 60 * 1000);

describe("fetchMofeProblems", () => {
	test("should fetch problems successfully", async () => {
		expect(problems).toBeDefined();
		expect(problems.length).toBeGreaterThan(0);
	});
	test("problem tuatpc2025spring_a exists", () => {
		const problem = problems.find((p) =>
			p.Url().includes("tuatpc2025spring_a"),
		);
		if (!problem) {
			throw new Error("Problem tuatpc2025spring_a not found");
		}
		expect(problem.Title()).toBe("628");
		expect(problem.Url()).toBe(
			"https://mofecoder.com/contests/tuatpc2025spring/tasks/tuatpc2025spring_a",
		);
		expect(problem.ContestTitle()).toBe("TUATPC 2025 Spring");
		expect(problem.ContestUrl()).toBe(
			"https://mofecoder.com/contests/tuatpc2025spring",
		);
	});
});
