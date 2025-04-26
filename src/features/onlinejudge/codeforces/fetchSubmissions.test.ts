import { beforeAll, describe, expect, test } from "vitest";
import { fetchCodeforcesSubmissions } from "./fetchSubmissions";

import { CodeforcesSubmission } from "./Submisson";
let submissons: CodeforcesSubmission[] = [];

beforeAll(async () => {
	submissons = (await fetchCodeforcesSubmissions("Mikunyan")).map(
		(submission) =>
			new CodeforcesSubmission({
				...submission,
				...submission.problem,
			}),
	);
});

describe("fetchCodeforcesSubmissions", () => {
	test("fetch submissions successfully", () => {
		console.log(submissons);
		expect(submissons.length).toBeGreaterThan(0);
	});
});
