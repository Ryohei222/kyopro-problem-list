import { fetchApi } from "../fetchApi";
import { AtcoderContestsApiSchema } from "./ContestsSchema";
import { ATCODER_API_URL } from "./constants";

export async function getAtcoderContests() {
	return fetchApi(
		`${ATCODER_API_URL}/resources/contests.json`,
		AtcoderContestsApiSchema,
	);
}
