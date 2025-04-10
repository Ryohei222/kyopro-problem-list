import { fetchApi } from "../fetchApi";
import { ATCODER_API_URL } from "./constants";
import { AtcoderContestsApiSchema } from "./ContestsSchema";

export async function getAtcoderContests() {
    return fetchApi(`${ATCODER_API_URL}/resources/contests.json`, AtcoderContestsApiSchema);
}
