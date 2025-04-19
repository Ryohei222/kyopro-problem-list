import { fetchApi } from "../utils/fetchApi";
import { YukicoderProblem } from "./Problem";
import { YUKICODER_API_URL } from "./constants";

import { z } from "zod";

const YukicoderProblemSchema = z.object({
	No: z.number().nullable(),
	ProblemId: z.number(),
	Title: z.string(),
	AuthorId: z.number(),
	TesterIds: z.string(),
	Level: z.number(),
	ProblemType: z.number(),
	Tags: z.string(),
	Date: z.string().nullable(),
});

const YukicoderProblemsApiSchema = z.array(YukicoderProblemSchema);

export async function fetchYukicoderProblems(): Promise<YukicoderProblem[]> {
	const data = await fetchApi(
		`${YUKICODER_API_URL}/problems`,
		YukicoderProblemsApiSchema,
	);
	return data
		.map((p) =>
			p?.No
				? new YukicoderProblem(p.No, p.ProblemId, p.Title, p.Level)
				: undefined,
		)
		.filter((p) => p !== undefined);
}
