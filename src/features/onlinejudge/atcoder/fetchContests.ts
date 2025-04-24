import { fetchApi } from "../utils/fetchApi";
import { ATCODER_API_URL } from "./constants";

import { z } from "zod";

const AtcoderContestSchema = z.object({
	id: z.string(),
	start_epoch_second: z.number(),
	duration_second: z.number(),
	title: z.string(),
	rate_change: z.string(),
});

const AtcoderContestsApiSchema = z.array(AtcoderContestSchema);

export async function fetchAtcoderContests() {
	return fetchApi(
		`${ATCODER_API_URL}/resources/contests.json`,
		AtcoderContestsApiSchema,
	);
}
