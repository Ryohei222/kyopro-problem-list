import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonProblem } from "../../../types/CommonProblem";

export class AojProblem implements CommonProblem {
	public readonly resource = Resource.AOJ;
	private readonly name: string;
	private readonly id: string;
	private readonly maxScore: number;

	constructor({
		name,
		id,
		maxScore,
	}: { name: string; id: string; maxScore: number }) {
		this.name = name;
		this.id = id;
		this.maxScore = maxScore;
	}

	ProblemKey() {
		return createProblemKey({
			resource: this.resource,
			contestId: "0",
			problemId: this.id,
		});
	}

	Title() {
		return this.name;
	}

	Url() {
		return `https://onlinejudge.u-aizu.ac.jp/problems/${this.id}`;
	}

	Unpack() {
		return {
			id: this.id,
			name: this.name,
			maxScore: this.maxScore,
		};
	}

	Stringify(): string {
		return `${this.resource}-${this.id}-${this.name}-${this.maxScore}`;
	}

	Equals(other: CommonProblem) {
		return this.Stringify() === other.Stringify();
	}
}
