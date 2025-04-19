import type { Resource } from "@prisma/client";

type Verdict = "AC" | "WA";

export interface CommonSubmission {
	readonly submissionId: string;
	readonly resource: Resource;
	readonly contestId?: string;
	readonly problemId: string;
	readonly verdict: Verdict;
	readonly submittedAt: Date;
}
