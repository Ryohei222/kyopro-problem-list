import { CodeforcesSubmissionsApiSchema } from "./SubmissionsSchema";
import { CommonSubmission } from "@/types/Submission";
import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { CODEFORCES_API_URL } from "./constant";

export async function getCodeforcesSubmissions(user_id: string): Promise<CommonSubmission[]> {
    return fetchApi(
        `${CODEFORCES_API_URL}/user.status?handle=${user_id}&count=100000`,
        CodeforcesSubmissionsApiSchema,
    ).then((data) => {
        return data.result.map((submission) => ({
            submissionId: submission.id.toString(),
            resource: Resource.CODEFORCES,
            contestId: submission.contestId.toString(),
            problemId: `${submission.problem.index}`,
            verdict: submission.verdict === "OK" ? "AC" : "WA",
            submittedAt: new Date(submission.creationTimeSeconds * 1000),
        }));
    });
}
