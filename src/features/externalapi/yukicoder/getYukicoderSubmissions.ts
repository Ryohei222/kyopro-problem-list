import type { CommonSubmission } from "@/types/CommonSubmission";
import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { YukicoderSubmissionsApiSchema } from "./SubmissionsSchema";
import { YUKICODER_API_URL } from "./constant";

export async function getYukicoderSubmissions(
	username: string,
): Promise<CommonSubmission[]> {
	return fetchApi(
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
