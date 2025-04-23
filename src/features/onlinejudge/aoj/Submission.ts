import { type ProblemKey, createProblemKey } from "@/types/CommonProblem";
import type { Submission, SubmissionVerdict } from "@/types/Submission";
import { Resource } from "@prisma/client";

export class AojSubmission implements Submission {
	private readonly judgeId: number;
	private readonly userId: string;
	private readonly problemId: string;
	private readonly language: string;
	private readonly version: string;
	private readonly submissionDate: number;
	private readonly judgeDate: number;
	private readonly cpuTime: number;
	private readonly memory: number;
	private readonly codeSize: number;
	private readonly server: number;
	private readonly policy: string;
	private readonly rating: number;
	private readonly review: number;
	constructor({
		judgeId,
		userId,
		problemId,
		language,
		version,
		submissionDate,
		judgeDate,
		cpuTime,
		memory,
		codeSize,
		server,
		policy,
		rating,
		review,
	}: {
		judgeId: number;
		userId: string;
		problemId: string;
		language: string;
		version: string;
		submissionDate: number;
		judgeDate: number;
		cpuTime: number;
		memory: number;
		codeSize: number;
		server: number;
		policy: string;
		rating: number;
		review: number;
	}) {
		this.judgeId = judgeId;
		this.userId = userId;
		this.problemId = problemId;
		this.language = language;
		this.version = version;
		this.submissionDate = submissionDate;
		this.judgeDate = judgeDate;
		this.cpuTime = cpuTime;
		this.memory = memory;
		this.codeSize = codeSize;
		this.server = server;
		this.policy = policy;
		this.rating = rating;
		this.review = review;
	}
	ProblemKey(): ProblemKey {
		return createProblemKey({
			resource: Resource.AOJ,
			contestId: "0",
			problemId: this.problemId.toString(),
		});
	}
	Resource(): Resource {
		return Resource.AOJ;
	}
	Verdict(): SubmissionVerdict {
		return "AC";
	}
	Url(): string {
		return `https://onlinejudge.u-aizu.ac.jp/status/users/${this.userId}/submissions/${this.server}/${this.problemId}/judge/${this.judgeId}/${this.language}`;
	}
}
