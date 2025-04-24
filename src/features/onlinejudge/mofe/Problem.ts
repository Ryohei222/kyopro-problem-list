import { createProblemKey } from "@/types/CommonProblem";
import type { Resource } from "@prisma/client";
import type { CommonContest } from "../../../types/CommonContest";
import type { CommonProblem } from "../../../types/CommonProblem";

export class MofeProblem implements CommonProblem, CommonContest {
	public readonly resource: Resource = "MOFE";
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
