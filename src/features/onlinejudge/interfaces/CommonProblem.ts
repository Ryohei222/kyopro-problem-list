import type { ProblemKey } from "@/types/CommonProblem";
import type { Resource } from "@prisma/client";

export interface CommonProblem {
	getResource(): Resource;
	getProblemKey(): ProblemKey;
	getTitle(): string;
	getUrl(): string;
}
