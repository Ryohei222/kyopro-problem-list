import { z } from "zod";

export const YukicoderSubmissionSchema = z.object({
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

export const YukicoderSubmissionsApiSchema = z.array(YukicoderSubmissionSchema);
