import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonContest } from "../../../types/CommonContest";
import type { CommonProblem } from "../../../types/CommonProblem";
import type { GetDifficulty } from "../../../types/GetDifficulty";

export class AtcoderProblem
	implements CommonProblem, CommonContest, GetDifficulty
{
	resource: Resource = Resource.ATCODER;
	private readonly id: string;
	private readonly contestId: string;
	private readonly name: string;
	private readonly contestName: string;
	private readonly difficulty?: number | undefined;
	constructor({
		id,
		contestId,
		name,
		contestName,
		difficulty,
	}: {
		id: string;
		contestId: string;
		name: string;
		contestName: string;
		difficulty?: number | undefined;
	}) {
		this.id = id;
		this.contestId = contestId;
		this.name = name;
		this.contestName = contestName;
		this.difficulty = difficulty;
	}

	ProblemKey() {
		return createProblemKey({
			resource: this.resource,
			contestId: this.contestId,
			problemId: this.id,
		});
	}
	Title() {
		return this.name;
	}
	Url() {
		return `https://atcoder.jp/contests/${this.contestId}/tasks/${this.id}`;
	}
	ContestTitle() {
		return this.contestName;
	}
	ContestUrl() {
		return `https://atcoder.jp/contests/${this.contestId}`;
	}
	Difficulty() {
		return this.difficulty;
	}
	Unpack() {
		return {
			id: this.id,
			contestId: this.contestId,
			name: this.name,
			contestName: this.contestName,
			difficulty: this.difficulty,
		};
	}

	Stringify(): string {
		return `${this.resource}-${this.contestId}-${this.id}-${this.name}-${this.contestName}-${this.difficulty}`;
	}

	Equals(other: CommonProblem): boolean {
		return this.Stringify() === other.Stringify();
	}
}
