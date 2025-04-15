import { z } from "zod";

export const AtcoderSubmissionSchema = z.object({
	contest_id: z.string(),
	problem_id: z.string(),
	epoch_second: z.number(),
	execution_time: z.number().nullable(),
	id: z.number(),
	language: z.string(),
	length: z.number(),
	point: z.number(),
	result: z.string(),
	user_id: z.string(),
});

export const AtcoderSubmissionsApiSchema = z.array(AtcoderSubmissionSchema);
