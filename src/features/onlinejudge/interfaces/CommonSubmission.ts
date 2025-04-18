import type { Resource } from "@prisma/client";

type Verdict = "AC" | "WA";

export interface CommonSubmission {
	submissionId: string;
	resource: Resource;
	contestId: string;
	problemId: string;
	verdict: Verdict;
	submittedAt: Date;
}
