import { Resource } from "@prisma/client";
import { z } from "zod";

export const ProblemListItemSchema = z.object({
    resource: z.nativeEnum(Resource),
    contestId: z.string(),
    problemId: z.string(),
    memo: z.string().max(400, { message: "メモは 400 文字以内である必要があります" }),
    hint: z.string().max(400, { message: "ヒントは 400 文字以内である必要があります" }),
    order: z.number().int(),
});
