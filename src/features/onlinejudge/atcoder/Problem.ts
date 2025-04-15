import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import { z } from "zod";
import type { CommonContest } from "../interfaces/CommonContest";
import type { CommonProblem } from "../interfaces/CommonProblem";
import type { GetDifficulty } from "../interfaces/GetDifficulty";

const AtcoderProblemSchema = z.object({
	id: z.string(),
	contest_id: z.string(),
	problem_index: z.string(),
	name: z.string(),
	title: z.string(),
});

type AtcoderProblemType = z.infer<typeof AtcoderProblemSchema>;
export const AtcoderProblemsApiSchema = z.array(AtcoderProblemSchema);

export class AtcoderProblem
	implements AtcoderProblemType, CommonProblem, CommonContest, GetDifficulty
{
	constructor(
		public readonly id: string,
		public readonly contest_id: string,
		public readonly problem_index: string,
		public readonly name: string,
		public readonly title: string,
		public readonly contest_title: string,
		public readonly difficulty?: number,
	) {}

	getResource() {
		return Resource.ATCODER;
	}
	getProblemKey() {
		return createProblemKey({
			resource: this.getResource(),
			contestId: this.contest_id,
			problemId: this.problem_index,
		});
	}
	getTitle() {
		return this.title;
	}
	getUrl() {
		return `https://atcoder.jp/contests/${this.contest_id}/tasks/${this.problem_index}`;
	}
	getContestTitle() {
		return this.contest_title;
	}
	getContestUrl() {
		return `https://atcoder.jp/contests/${this.contest_id}`;
	}
	getDifficulty() {
		return 0;
	}
}
