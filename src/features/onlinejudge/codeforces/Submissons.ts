import { type ProblemKey, createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@/types/Resource";
import type { Submission, SubmissionVerdict } from "@/types/Submission";

export class CodeforcesSubmission implements Submission {
	private readonly id: number;
	private readonly contestId: number;
	private readonly creationTimeSeconds: number;
	private readonly relativeTimeSeconds: number;
	private readonly index: string;
	private readonly programmingLanguage: string;
	private readonly verdict: string;
	private readonly testset: string;
	private readonly passedTestCount: number;
	private readonly timeConsumedMillis: number;
	private readonly memoryConsumedBytes: number;
	constructor({
		id,
		contestId,
		creationTimeSeconds,
		relativeTimeSeconds,
		index,
		programmingLanguage,
		verdict,
		testset,
		passedTestCount,
		timeConsumedMillis,
		memoryConsumedBytes,
	}: {
		id: number;
		contestId: number;
		creationTimeSeconds: number;
		relativeTimeSeconds: number;
		index: string;
		programmingLanguage: string;
		verdict: string;
		testset: string;
		passedTestCount: number;
		timeConsumedMillis: number;
		memoryConsumedBytes: number;
	}) {
		this.id = id;
		this.contestId = contestId;
		this.creationTimeSeconds = creationTimeSeconds;
		this.relativeTimeSeconds = relativeTimeSeconds;
		this.index = index;
		this.programmingLanguage = programmingLanguage;
		this.verdict = verdict;
		this.testset = testset;
		this.passedTestCount = passedTestCount;
		this.timeConsumedMillis = timeConsumedMillis;
		this.memoryConsumedBytes = memoryConsumedBytes;
	}
	ProblemKey(): ProblemKey {
		return createProblemKey({
			resource: this.Resource(),
			contestId: this.contestId.toString(),
			problemId: this.index,
		});
	}
	Resource(): Resource {
		return Resource.CODEFORCES;
	}
	Verdict(): SubmissionVerdict {
		return this.verdict === "OK" ? "AC" : "WA";
	}
	Url(): string {
		return `https://codeforces.com/contest/${this.contestId}/submission/${this.id}`;
	}
}
