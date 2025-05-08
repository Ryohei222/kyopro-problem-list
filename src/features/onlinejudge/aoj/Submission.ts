import { type ProblemKey, createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@/types/Resource";
import type { Submission, SubmissionVerdict } from "@/types/Submission";
import { AojSubmissionStatus } from "./SubmissionStatus";

export class AojSubmission implements Submission {
	public readonly judgeId: number;
	public readonly judgeType: number;
	public readonly userId: string;
	public readonly problemId: string;
	public readonly submissionDate: number;
	public readonly language: string;
	public readonly status: number;
	public readonly cpuTime: number;
	public readonly memory: number;
	public readonly codeSize: number;
	public readonly accuracy: string;
	public readonly judgeDate: number;
	public readonly score: number;
	public readonly problemTitle: string | null;
	public readonly token: string | null;
	constructor({
		judgeId,
		judgeType,
		userId,
		problemId,
		submissionDate,
		language,
		status,
		cpuTime,
		memory,
		codeSize,
		accuracy,
		judgeDate,
		score,
		problemTitle,
		token,
	}: {
		judgeId: number;
		judgeType: number;
		userId: string;
		problemId: string;
		submissionDate: number;
		language: string;
		status: number;
		cpuTime: number;
		memory: number;
		codeSize: number;
		accuracy: string;
		judgeDate: number;
		score: number;
		problemTitle: string | null;
		token: string | null;
	}) {
		this.judgeId = judgeId;
		this.judgeType = judgeType;
		this.userId = userId;
		this.problemId = problemId;
		this.submissionDate = submissionDate;
		this.language = language;
		this.status = status;
		this.cpuTime = cpuTime;
		this.memory = memory;
		this.codeSize = codeSize;
		this.accuracy = accuracy;
		this.judgeDate = judgeDate;
		this.score = score;
		this.problemTitle = problemTitle;
		this.token = token;
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
		return this.status === AojSubmissionStatus.STATE_ACCEPTED ? "AC" : "WA";
	}
	Url(): string {
		return `https://onlinejudge.u-aizu.ac.jp/status/users/${this.userId}/submissions/1/${this.problemId}/judge/${this.judgeId}/${this.language}`;
	}
}
