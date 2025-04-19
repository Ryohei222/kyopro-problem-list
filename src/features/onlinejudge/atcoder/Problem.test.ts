import { describe, expect, test } from "vitest";
import { AtcoderProblem } from "./Problem";

const problem = new AtcoderProblem(
	"abc123_a",
	"abc123",
	"Five Antennas",
	"AtCoder Beginner Contest 123",
	31,
);

describe("AtcoderProblem", () => {
	test("Title", () => {
		expect(problem.Title()).toBe("Five Antennas");
	});
	test("Url", async () => {
		expect(problem.Url()).toBe(
			"https://atcoder.jp/contests/abc123/tasks/abc123_a",
		);
		const response = await fetch(problem.Url());
		expect(response.status).toBe(200);
	});
	test("Difficulty", () => {
		expect(problem.Difficulty()).toBe(31);
	});
	test("ContestTitle", () => {
		expect(problem.ContestTitle()).toBe("AtCoder Beginner Contest 123");
	});
	test("ContestUrl", async () => {
		expect(problem.ContestUrl()).toBe("https://atcoder.jp/contests/abc123");
		const response = await fetch(problem.ContestUrl());
		expect(response.status).toBe(200);
	});
});
