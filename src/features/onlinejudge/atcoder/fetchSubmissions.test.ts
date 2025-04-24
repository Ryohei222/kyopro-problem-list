import { beforeAll, describe, expect, test } from "vitest";
import { fetchAtcoderSubmissionsFromSecond } from "./fetchSubmissions";

import { AtcoderSubmission } from "./Submission";

let submissons: AtcoderSubmission[] = [];

beforeAll(async () => {
	submissons = (await fetchAtcoderSubmissionsFromSecond("kobaryo222", 0)).map(
		(submission) => new AtcoderSubmission(submission),
	);
});

describe("fetchAtcoderSubmissionsFromSecond", () => {
	test("fetch submissions successfully", () => {
		expect(submissons.length).toBeGreaterThan(0);
	});
});
