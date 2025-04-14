import { z } from "zod";

export const AtcoderContestSchema = z.object({
	id: z.string(),
	start_epoch_second: z.number(),
	duration_second: z.number(),
	title: z.string(),
	rate_change: z.string(),
});

export const AtcoderContestsApiSchema = z.array(AtcoderContestSchema);
