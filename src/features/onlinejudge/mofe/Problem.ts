import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonContest } from "../../../types/CommonContest";
import type { CommonProblem } from "../../../types/CommonProblem";

export class MofeProblem implements CommonProblem, CommonContest {
	public readonly resource: Resource = Resource.MOFE;
	constructor(
		private slug: string,
		private name: string,
		private position: string,
		private difficulty: string,
		private points: number,
		private contestSlug: string,
		private contestName: string,
	) {}

	ProblemKey() {
		return createProblemKey({
			resource: this.resource,
			contestId: this.contestSlug,
			problemId: this.slug,
		});
	}
	Title() {
		return this.name;
	}
	Url() {
		return `https://mofecoder.com/contests/${this.contestSlug}/tasks/${this.slug}`;
	}
	ContestTitle() {
		return this.contestName;
	}
	ContestUrl() {
		return `https://mofecoder.com/contests/${this.contestSlug}`;
	}
	Difficulty() {
		return 0;
	}

	Unpack() {
		return {
			slug: this.slug,
			name: this.name,
			position: this.position,
			difficulty: this.difficulty,
			points: this.points,
			contestSlug: this.contestSlug,
			contestName: this.contestName,
		};
	}
}
