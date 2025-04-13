import { z } from "zod";

export const ProblemListMetadataSchema = z.object({
    name: z
        .string()
        .min(3, { message: "リスト名は3文字以上である必要があります" })
        .max(50, { message: "リスト名は50文字以内である必要があります" }),
    description: z.string().max(500, { message: "概要は500文字以内である必要があります" }),
    isPublic: z.boolean(),
});

export type ProblemListMetadataSchemaType = z.infer<typeof ProblemListMetadataSchema>;
