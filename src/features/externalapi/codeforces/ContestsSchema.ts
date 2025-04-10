import { z } from "zod";

const CodeforcesContestSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    phase: z.string(),
    frozen: z.boolean(),
    durationSeconds: z.number(),
    startTimeSeconds: z.number(),
    relativeTimeSeconds: z.number(),
});

const CodeforcesContestsAPISchema = z.object({
    status: z.string(),
    result: z.array(CodeforcesContestSchema),
});

export { CodeforcesContestsAPISchema };
