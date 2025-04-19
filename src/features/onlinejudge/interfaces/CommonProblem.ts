import type { ProblemKey } from "@/types/CommonProblem";
import type { Resource } from "@prisma/client";

export interface CommonProblem {
	resource: Resource;
	contestId?: string;
	problemId: string;
	name: string;
	getResource(): Resource;
	getProblemKey(): ProblemKey;
	getTitle(): string;
	getUrl(): string;
}
