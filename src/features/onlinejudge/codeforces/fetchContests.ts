import { z } from "zod";
import { fetchApi } from "../utils/fetchApi";
import { CODEFORCES_API_URL } from "./constants";

const CodeforcesContestSchema = z.object({
	id: z.number(),
	name: z.string(),
	type: z.string(),
	phase: z.string(),
	frozen: z.boolean(),
	durationSeconds: z.number(),
	startTimeSeconds: z.number(),
	relativeTimeSeconds: z.number(),
});

const CodeforcesContestsAPISchema = z.object({
	status: z.string(),
	result: z.array(CodeforcesContestSchema),
});

export async function fetchCodeforcesContests() {
	return fetchApi(
		`${CODEFORCES_API_URL}/contest.list`,
		CodeforcesContestsAPISchema,
	).then((data) => {
		return data.result;
	});
}
