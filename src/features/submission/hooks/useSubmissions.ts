import { CommonSubmission } from "@/types/Submission";
import { getAtCoderSubmissions } from "../utils/fetchAtCoderSubmissions";
import useSWRMutation from "swr/mutation";
import { getAOJSubmissions } from "../utils/fetchAOJSubmissions";
import { getYukicoderSubmissions } from "../utils/fetchYukicoderSubmissions";
import { getCodeforcesSubmissions } from "../utils/fetchCodeforcesSubmissions";

function wrapGetContestSubmissions(
    contest: string,
    getSubmissions: (id: string) => Promise<CommonSubmission[]>,
) {
    return function (id: string) {
        const { data, error, trigger, isMutating } = useSWRMutation(
            `/submissions/${contest}`,
            (url: string, { arg }: { arg: string }) => getSubmissions(arg),
            {
                populateCache: true,
            },
        );
        return {
            submissions: data,
            error,
            trigger,
            isMutating,
        };
    };
}

export const useAtCoderSubmissions = wrapGetContestSubmissions("atcoder", getAtCoderSubmissions);
export const useAOJSubmissions = wrapGetContestSubmissions("aoj", getAOJSubmissions);
export const useCodeforcesSubmissions = wrapGetContestSubmissions(
    "codeforces",
    getCodeforcesSubmissions,
);
export const useYukicoderSubmissions = wrapGetContestSubmissions(
    "yukicoder",
    getYukicoderSubmissions,
);
