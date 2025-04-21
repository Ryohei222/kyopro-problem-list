import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonProblem } from "../../../types/CommonProblem";

export class AojProblem implements CommonProblem {
	public readonly resource = Resource.AOJ;

	constructor(
		private readonly name: string,
		private readonly id: string,
		private readonly maxScore: number,
	) {}

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
