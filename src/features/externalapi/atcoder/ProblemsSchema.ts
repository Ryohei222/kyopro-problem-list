import { z } from "zod";

const AtcoderProblemSchema = z.object({
	id: z.string(),
	contest_id: z.string(),
	problem_index: z.string(),
	name: z.string(),
	title: z.string(),
});

export const AtcoderProblemsApiSchema = z.array(AtcoderProblemSchema);
