import { beforeAll, describe, expect, test } from "vitest";
import { fetchAojSubmissions } from "./fetchSubmissions";

import { AojSubmission } from "./Submission";
let submissions: AojSubmission[] = [];

beforeAll(async () => {
	submissions = (await fetchAojSubmissions("kobaryo222")).map(
		(submission) => new AojSubmission(submission),
	);
});

describe("fetchAojSubmissions", () => {
	test("fetch submissions successfully", () => {
		console.log(submissions);
		expect(submissions.length).toBeGreaterThan(0);
	});
});
