import { AojSubmissionsApiSchema } from "./SubmissionsSchema";
import { CommonSubmission } from "@/types/CommonSubmission";
import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { AOJ_API_URL } from "./constant";

export async function getAojSubmissions(user_id: string): Promise<CommonSubmission[]> {
    if (!user_id) return [];
    return await fetchApi(
        `${AOJ_API_URL}/solutions/users/${user_id}?size=100000`,
        AojSubmissionsApiSchema,
    ).then((submissions) => {
        return submissions.map((submission) => {
            return {
                submissionId: submission.judgeId.toString(),
                resource: Resource.AOJ,
                contestId: "0",
                problemId: submission.problemId,
                verdict: "AC",
                submittedAt: new Date(submission.submissionDate),
            };
        });
    });
}
