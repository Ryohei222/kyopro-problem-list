import { describe, expect, test } from "vitest";
import { fetchAojProblems } from "../fetchProblems";

describe("fetchAojProblems", () => {
	test("should fetch problems successfully", async () => {
		const problems = await fetchAojProblems();
		expect(problems).toBeDefined();
		expect(problems.length).toBeGreaterThan(0);
	});
});
