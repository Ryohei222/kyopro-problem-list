import { fetchApi } from "../fetchApi";
import { CODEFORCES_API_URL } from "./constant";
import { CodeforcesContestsAPISchema } from "./ContestsSchema";

export async function getCodeforcesContests() {
    return fetchApi(`${CODEFORCES_API_URL}/contest.list`, CodeforcesContestsAPISchema).then(
        (data) => {
            return data.result;
        },
    );
}
