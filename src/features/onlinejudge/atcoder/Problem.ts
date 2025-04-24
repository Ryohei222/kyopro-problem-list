import { createProblemKey } from "@/types/CommonProblem";
import type { Resource } from "@prisma/client";
import type { CommonContest } from "../../../types/CommonContest";
import type { CommonProblem } from "../../../types/CommonProblem";
import type { GetDifficulty } from "../../../types/GetDifficulty";

export class AtcoderProblem
	implements CommonProblem, CommonContest, GetDifficulty
{
	resource: Resource = "ATCODER";
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
	DifficultyColor() {
		if (!this.difficulty || this.difficulty < 400) return "#808080";
		if (this.difficulty < 800) return "#804000";
		if (this.difficulty < 1200) return "#008000";
		if (this.difficulty < 1600) return "#00C0C0";
		if (this.difficulty < 2000) return "#0000FF";
		if (this.difficulty < 2400) return "#C0C000";
		if (this.difficulty < 2800) return "#FF8000";
		if (this.difficulty < 3200) return "#FF0000";
		return "#FF0000";
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
