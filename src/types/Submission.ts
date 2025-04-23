import type { Resource } from "@prisma/client";
import type { ProblemKey } from "./CommonProblem";

export type SubmissionVerdict = "AC" | "WA";

export interface Submission {
	Resource(): Resource;
	ProblemKey(): ProblemKey;
	Verdict(): SubmissionVerdict;
	SubmittedAt?(): Date;
	Url?(): string;
}
