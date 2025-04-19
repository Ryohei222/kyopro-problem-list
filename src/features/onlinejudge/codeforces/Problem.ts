import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonProblem } from "../interfaces/CommonProblem";

export class CodeforcesProblem implements CommonProblem {
	resource = Resource.CODEFORCES;
	contestId: string;
	problemId: string;
	name: string;

	constructor(contestId: string, problemId: string, name: string) {
		this.contestId = contestId;
		this.problemId = problemId;
		this.name = name;
	}

	getResource() {
		return this.resource;
	}

	getProblemKey() {
		return createProblemKey({
			resource: this.getResource(),
			contestId: this.contestId,
			problemId: this.problemId,
		});
	}

	getTitle() {
		return this.name;
	}

	getUrl() {
		return `https://codeforces.com/contest/${this.contestId}/problem/${this.problemId}`;
	}
}
