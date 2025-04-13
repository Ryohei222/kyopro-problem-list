import { Resource } from "@prisma/client";

import { getAojSubmissions } from "./aoj/getAojSubmissions";
import { getAtcoderSubmissions } from "./atcoder/getAtcoderSubmissions";
import { getCodeforcesSubmissions } from "./codeforces/getCodeforcesSubmissions";
import { getYukicoderSubmissions } from "./yukicoder/getYukicoderSubmissions";
import { CommonSubmission } from "@/types/CommonSubmission";

export async function getSubmissions(
    resource: Resource,
    userid: string,
): Promise<CommonSubmission[]> {
    if (userid === "") {
        return [];
    }
    switch (resource) {
        case Resource.AOJ:
            return getAojSubmissions(userid);
        case Resource.ATCODER:
            return getAtcoderSubmissions(userid);
        case Resource.CODEFORCES:
            return getCodeforcesSubmissions(userid);
        case Resource.YUKICODER:
            return getYukicoderSubmissions(userid);
        case Resource.MOFE:
            throw new Error("MOFE is not supported yet");
    }
}
