import { z } from "zod";
import { fetchApi } from "../utils/fetchApi";
import { YUKICODER_API_URL } from "./constants";

import { YukicoderSubmission } from "./Submission";

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
): Promise<YukicoderSubmission[]> {
	if (!userId) return [];
	const data = await fetchApi(
		`${YUKICODER_API_URL}/solved/name/${userId}`,
		YukicoderSubmissionsApiSchema,
	);
	return data.map(
		(submission) =>
			new YukicoderSubmission({
				...submission,
				_Date: submission.Date,
			}),
	);
}
