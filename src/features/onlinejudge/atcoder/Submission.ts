import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@/types/Resource";
import type { Submission, SubmissionVerdict } from "@/types/Submission";

export class AtcoderSubmission implements Submission {
	private readonly contest_id: string;
	private readonly problem_id: string;
	private readonly epoch_second: number;
	private readonly execution_time: number | null;
	private readonly id: number;
	private readonly language: string;
	private readonly length: number;
	private readonly point: number;
	private readonly result: string;
	private readonly user_id: string;
	constructor({
		contest_id,
		problem_id,
		epoch_second,
		execution_time,
		id,
		language,
		length,
		point,
		result,
		user_id,
	}: {
		contest_id: string;
		problem_id: string;
		epoch_second: number;
		execution_time: number | null;
		id: number;
		language: string;
		length: number;
		point: number;
		result: string;
		user_id: string;
	}) {
		this.contest_id = contest_id;
		this.problem_id = problem_id;
		this.epoch_second = epoch_second;
		this.execution_time = execution_time;
		this.id = id;
		this.language = language;
		this.length = length;
		this.point = point;
		this.result = result;
		this.user_id = user_id;
	}
	Resource(): Resource {
		return Resource.ATCODER;
	}
	Verdict(): SubmissionVerdict {
		return this.result === "AC" ? "AC" : "WA";
	}
	ProblemKey() {
		return createProblemKey({
			resource: this.Resource(),
			contestId: this.contest_id,
			problemId: this.problem_id,
		});
	}
	Url() {
		return `https://atcoder.jp/contests/${this.contest_id}/submissions/${this.id}`;
	}
}
