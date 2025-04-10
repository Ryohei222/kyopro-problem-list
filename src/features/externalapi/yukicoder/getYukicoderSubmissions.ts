import { YukicoderSubmissionsApiSchema } from "./SubmissionsSchema";
import { CommonSubmission } from "@/types/Submission";
import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { YUKICODER_API_URL } from "./constant";

export async function getYukicoderSubmissions(username: string): Promise<CommonSubmission[]> {
    return await fetchApi(
        `${YUKICODER_API_URL}/solved/name/${username}`,
        YukicoderSubmissionsApiSchema,
    ).then((result) => {
        return result.map((submission) => ({
            submissionId: submission.No.toString(),
            resource: Resource.YUKICODER,
            contestId: "0",
            problemId: submission.No.toString(),
            verdict: "AC",
            submittedAt: new Date(submission.Date),
        }));
    });
}
