import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonProblem } from "../interfaces/CommonProblem";

export class YukicoderProblem implements CommonProblem {
	resource = Resource.YUKICODER;
	problemId: string;
	name: string;

	constructor(problemId: string, name: string) {
		this.problemId = problemId;
		this.name = name;
	}

	getResource() {
		return this.resource;
	}

	getProblemKey() {
		return createProblemKey({
			resource: this.getResource(),
			contestId: "0",
			problemId: this.problemId,
		});
	}

	getTitle() {
		return this.name;
	}

	getUrl() {
		return `https://yukicoder.me/problems/no/${this.problemId}`;
	}
}
