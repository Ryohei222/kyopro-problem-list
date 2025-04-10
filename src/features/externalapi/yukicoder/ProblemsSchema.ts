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

export const YukicoderProblemsApiSchema = z.array(YukicoderProblemSchema);
