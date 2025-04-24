import type { CommonProblem } from "@/types/CommonProblem";
import { z } from "zod";

export const ProblemListItemSchema = z.object({
	problemKey: z.string(),
	memo: z
		.string()
		.max(400, { message: "メモは 400 文字以内である必要があります" }),
	hint: z
		.string()
		.max(400, { message: "ヒントは 400 文字以内である必要があります" }),
	order: z.number().int(),
});

export type ProblemListItem = {
	problem: CommonProblem;
	memo: string;
	hint: string;
	order: number;
};
