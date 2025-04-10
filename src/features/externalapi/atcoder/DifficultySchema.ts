import { z } from "zod";

const AtcoderDifficultySchema = z.object({
    slope: z.number().optional(),
    intercept: z.number().optional(),
    variance: z.number().optional(),
    difficulty: z.number().optional(),
    discrimination: z.number().optional(),
    irt_loglikelihood: z.number().optional(),
    irt_users: z.number().optional(),
    is_experimental: z.boolean().optional(),
});

const AtcoderDifficultyApiSchema = z.record(z.string(), AtcoderDifficultySchema);

export { AtcoderDifficultySchema, AtcoderDifficultyApiSchema };
