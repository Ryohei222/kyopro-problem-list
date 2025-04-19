import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonContest } from "../../../types/CommonContest";
import type { CommonProblem } from "../../../types/CommonProblem";

export class MofeProblem implements CommonProblem, CommonContest {
	public readonly resource: Resource = Resource.MOFE;
	constructor(
		private problemId: string,
		private contestId: string,
		private name: string,
		private contestName: string,
	) {}

	ProblemKey() {
		return createProblemKey({
			resource: this.resource,
			contestId: this.contestId,
			problemId: this.problemId,
		});
	}
	Title() {
		return this.name;
	}
	Url() {
		return `https://mofecoder.com/contests/${this.contestId}/tasks/${this.problemId}`;
	}
	ContestTitle() {
		return this.contestName;
	}
	ContestUrl() {
		return `https://mofecoder.com/contests/${this.contestId}`;
	}
	Difficulty() {
		return 0;
	}
}
