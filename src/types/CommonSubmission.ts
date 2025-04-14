import type { Resource } from "@prisma/client";

export type Verdict = "AC" | "WA";

export type CommonSubmission = {
	submissionId: string;
	resource: Resource;
	contestId: string;
	problemId: string;
	verdict: Verdict;
	submittedAt: Date;
};
