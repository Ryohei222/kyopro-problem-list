import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonContest } from "../../../types/CommonContest";
import type { CommonProblem } from "../../../types/CommonProblem";
import type { GetDifficulty } from "../../../types/GetDifficulty";

export class CodeforcesProblem
	implements CommonProblem, CommonContest, GetDifficulty
{
	constructor(
		public readonly contestId: number,
		public readonly name: string,
		public readonly contestName: string,
		public readonly index: string,
		public readonly points: number | undefined,
		public readonly rating: number | undefined,
	) {}

	public readonly resource = Resource.CODEFORCES;

	ProblemKey() {
		return createProblemKey({
			resource: this.resource,
			contestId: this.contestId.toString(),
			problemId: this.index,
		});
	}

	Title() {
		return this.name;
	}

	Url() {
		return `https://codeforces.com/contest/${this.contestId}/problem/${this.index}`;
	}

	ContestTitle(): string {
		return this.contestName;
	}

	ContestUrl(): string {
		return `https://codeforces.com/contest/${this.contestId}`;
	}

	Difficulty(): number | undefined {
		return this.rating;
	}

	Unpack() {
		return {
			contestId: this.contestId,
			name: this.name,
			contestName: this.contestName,
			index: this.index,
			points: this.points,
			rating: this.rating,
		};
	}
}
