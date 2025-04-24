import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonContest } from "../../../types/CommonContest";
import type { CommonProblem } from "../../../types/CommonProblem";
import type { GetDifficulty } from "../../../types/GetDifficulty";

export class CodeforcesProblem
	implements CommonProblem, CommonContest, GetDifficulty
{
	public readonly index: string;
	private readonly name: string;
	public readonly contestId: number;
	private readonly contestName: string;
	private readonly points: number | undefined;
	private readonly rating: number | undefined;
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

	public readonly resource = "CODEFORCES";

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
	DifficultyColor(): string {
		if (!this.rating || this.rating < 1200) return "#808080";
		if (this.rating < 1400) return "#008000";
		if (this.rating < 1600) return "#03A89E";
		if (this.rating < 1900) return "#0000FF";
		if (this.rating < 2100) return "#AA00AA";
		if (this.rating < 2400) return "#FF8C00";
		return "#FF0000";
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
