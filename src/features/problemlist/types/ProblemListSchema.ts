import { ProblemListItemSchema } from "./ProblemListItemSchema";
import { ProblemListMetadataSchema } from "./ProblemListMetadataSchema";
import { z } from "zod";

export const ProblemListSchema = z.object({
    id: z.string(),
    ...ProblemListMetadataSchema.shape,
    problemListRecords: z.array(ProblemListItemSchema),
});

export type ProblemListSchemaType = z.infer<typeof ProblemListSchema>;
