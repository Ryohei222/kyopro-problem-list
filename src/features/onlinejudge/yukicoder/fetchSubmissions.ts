import { Resource } from "@prisma/client";
import { z } from "zod";
import type { CommonSubmission } from "../../../types/CommonSubmission";
import { fetchApi } from "../utils/fetchApi";
import { YUKICODER_API_URL } from "./constants";

const YukicoderSubmissionSchema = z.object({
	No: z.number(),
	ProblemId: z.number(),
	Title: z.string(),
	AuthorId: z.number(),
	TesterIds: z.string(),
	Level: z.number(),
	ProblemType: z.number(),
	Tags: z.string(),
	Date: z.string(),
});

const YukicoderSubmissionsApiSchema = z.array(YukicoderSubmissionSchema);

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
