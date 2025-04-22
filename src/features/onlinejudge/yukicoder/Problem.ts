import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonProblem } from "../../../types/CommonProblem";

export class YukicoderProblem implements CommonProblem {
	public readonly resource = Resource.YUKICODER;
	private No: number;
	private ProblemId: number;
	private _Title: string;
	private Level: number;
	constructor({
		No,
		ProblemId,
		Title,
		Level,
	}: {
		No: number;
		ProblemId: number;
		Title: string;
		Level: number;
	}) {
		this.No = No;
		this.ProblemId = ProblemId;
		this._Title = Title;
		this.Level = Level;
	}

	ProblemKey() {
		return createProblemKey({
			resource: this.resource,
			contestId: "0",
			problemId: this.No.toString(),
		});
	}

	Title() {
		return this._Title;
	}

	Url() {
		return `https://yukicoder.me/problems/no/${this.No}`;
	}

	Unpack() {
		return {
			No: this.No,
			ProblemId: this.ProblemId,
			Title: this._Title,
			Level: this.Level,
		};
	}

	Stringify(): string {
		return `${this.resource}-${this.No}-${this._Title}-${this.Level}`;
	}

	Equals(other: CommonProblem): boolean {
		return this.Stringify() === other.Stringify();
	}
}
