import { beforeAll, describe, expect, test } from "vitest";
import { fetchCodeforcesSubmissions } from "./fetchSubmissions";

import { CodeforcesSubmission } from "./Submisson";
let submissions: CodeforcesSubmission[] = [];

beforeAll(async () => {
	submissions = (await fetchCodeforcesSubmissions("Mikunyan")).map(
		(submission) =>
			new CodeforcesSubmission({
				...submission,
				...submission.problem,
			}),
	);
});

describe("fetchCodeforcesSubmissions", () => {
	test("fetch submissions successfully", () => {
		console.log(submissions);
		expect(submissions.length).toBeGreaterThan(0);
	});
});
