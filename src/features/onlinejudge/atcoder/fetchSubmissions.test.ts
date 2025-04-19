import { beforeAll, describe, expect, test } from "vitest";
import {
	type AtcoderSubmission,
	fetchAtcoderSubmissionsFromSecond,
} from "./fetchSubmissions";

let submissons: AtcoderSubmission[] = [];

beforeAll(async () => {
	submissons = await fetchAtcoderSubmissionsFromSecond("kobaryo222", 0);
});

describe("fetchAtcoderSubmissionsFromSecond", () => {
	test("fetch submissions sucessfully", () => {
		expect(submissons.length).toBeGreaterThan(0);
	});
});
