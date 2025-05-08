import { beforeAll, describe, expect, test } from "vitest";
import { fetchAtcoderProblemDifficulties } from "./fetchDifficulties";

let difficulties = new Map<string, number>();

beforeAll(async () => {
	difficulties = await fetchAtcoderProblemDifficulties();
	return difficulties;
});

describe("fetchAtcoderProblems", () => {
	test("should fetch problems successfully", async () => {
		expect(difficulties).toBeDefined();
		expect(difficulties.size).toBeGreaterThan(0);
	});
});
