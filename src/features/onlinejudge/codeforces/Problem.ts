import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonContest } from "../../../types/CommonContest";
import type { CommonProblem } from "../../../types/CommonProblem";
import type { GetDifficulty } from "../../../types/GetDifficulty";

export class CodeforcesProblem
	implements CommonProblem, CommonContest, GetDifficulty
{
	public readonly index: string;
	public readonly name: string;
	public readonly contestId: number;
	public readonly contestName: string;
	public readonly points: number | undefined;
	public readonly rating: number | undefined;
	constructor({
		index,
		name,
		contestId,
		contestName,
		points,
		rating,
	}: {
		index: string;
		name: string;
		contestId: number;
		contestName: string;
		points?: number | undefined;
		rating?: number | undefined;
	}) {
		this.index = index;
		this.name = name;
		this.contestId = contestId;
		this.contestName = contestName;
		this.points = points;
		this.rating = rating;
	}

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

	Stringify(): string {
		return `${this.resource}-${this.contestId}-${this.index}-${this.name}`;
	}

	Equals(other: CommonProblem): boolean {
		return this.Stringify() === other.Stringify();
	}
}
