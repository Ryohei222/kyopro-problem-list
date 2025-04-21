import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonProblem } from "../../../types/CommonProblem";

export class YukicoderProblem implements CommonProblem {
	public readonly resource = Resource.YUKICODER;
	constructor(
		private No: number,
		private ProblemId: number,
		private _Title: string,
		private Level: number,
	) {}

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
}
