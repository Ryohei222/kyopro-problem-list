import { describe, expect, test } from "vitest";
import { AtcoderProblem } from "./Problem";

const problem = new AtcoderProblem(
	"abc123_a",
	"abc123",
	"A",
	"Five Antennas",
	"A - Five Antennas",
	"AtCoder Beginner Contest 123",
	31,
);

describe("AtcoderProblem", () => {
	test("getTitle", () => {
		expect(problem.getTitle()).toBe("Five Antennas");
	});
	test("getUrl", async () => {
		expect(problem.getUrl()).toBe(
			"https://atcoder.jp/contests/abc123/tasks/abc123_a",
		);
		const response = await fetch(problem.getUrl());
		expect(response.status).toBe(200);
	});
	test("getContestTitle", () => {
		expect(problem.getContestTitle()).toBe("AtCoder Beginner Contest 123");
	});
	test("getContestUrl", async () => {
		expect(problem.getContestUrl()).toBe("https://atcoder.jp/contests/abc123");
		const response = await fetch(problem.getContestUrl());
		expect(response.status).toBe(200);
	});
});
