import { fetchApi } from "../fetchApi";
import { CodeforcesContestsAPISchema } from "./ContestsSchema";
import { CODEFORCES_API_URL } from "./constant";

export async function getCodeforcesContests() {
	return fetchApi(
		`${CODEFORCES_API_URL}/contest.list`,
		CodeforcesContestsAPISchema,
	).then((data) => {
		return data.result;
	});
}
