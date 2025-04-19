import { Resource } from "@prisma/client";
import type { CommonSubmission } from "../../../types/CommonSubmission";
import { YukicoderSubmissionsApiSchema } from "../../externalapi/yukicoder/SubmissionsSchema";
import { fetchApi } from "../utils/fetchApi";
import { YUKICODER_API_URL } from "./constants";

export async function fetchYukicoderSubmissions(
	userId: string,
): Promise<CommonSubmission[]> {
	if (!userId) return [];
	const data = await fetchApi(
		`${YUKICODER_API_URL}/solved/name/${userId}`,
		YukicoderSubmissionsApiSchema,
	);
	return data.map((submission) => ({
		submissionId: submission.No.toString(),
		resource: Resource.YUKICODER,
		problemId: submission.No.toString(),
		verdict: "AC",
		submittedAt: new Date(submission.Date),
	}));
}
