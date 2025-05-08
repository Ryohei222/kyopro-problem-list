import type { CommonDifficulty } from "@/types/CommonDifficulty";
import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@/types/Resource";
import type { CommonContest } from "../../../types/CommonContest";
import type { CommonProblem } from "../../../types/CommonProblem";

export class MofeProblem
	implements CommonProblem, CommonContest, CommonDifficulty
{
	public readonly resource: Resource = Resource.MOFE;
	public readonly slug: string;
	private readonly name: string;
	private readonly position: string;
	private readonly difficulty: string;
	private readonly points: number;
	public readonly contestSlug: string;
	private readonly contestName: string;
	constructor({
		slug,
		name,
		position,
		difficulty,
		points,
		contestSlug,
		contestName,
	}: {
		slug: string;
		name: string;
		position: string;
		difficulty: string;
		points: number;
		contestSlug: string;
		contestName: string;
	}) {
		this.slug = slug;
		this.name = name;
		this.position = position;
		this.difficulty = difficulty;
		this.points = points;
		this.contestSlug = contestSlug;
		this.contestName = contestName;
	}

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

	Difficulty(): number {
		switch (this.difficulty) {
			case "Milk":
				return 200;
			case "Assam":
				return 600;
			case "Benihuki":
				return 1000;
			case "Ceylon":
				return 1400;
			case "Darjeeling":
				return 1800;
			case "EarlGray":
				return 2200;
			case "Flavor":
				return 2600;
			case "ผักชี":
				return 3000;
		}
		return 0;
	}

	DifficultyLabel(): string {
		return this.difficulty;
	}

	DifficultyColor(): string {
		switch (this.difficulty) {
			case "Milk":
				return "#808080";
			case "Assam":
				return "#804000";
			case "Benihuki":
				return "#008000";
			case "Ceylon":
				return "#00C0C0";
			case "Darjeeling":
				return "#0000FF";
			case "EarlGray":
				return "#C0C000";
			case "Flavor":
				return "#FF8000";
			case "ผักชี":
				return "#FF0000";
		}
		return "#808080";
	}

	Stringify(): string {
		return `${this.resource}-${this.slug}-${this.name}-${this.position}-${this.difficulty}-${this.points}-${this.contestSlug}-${this.contestName}`;
	}

	Equals(other: CommonProblem): boolean {
		return this.Stringify() === other.Stringify();
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
