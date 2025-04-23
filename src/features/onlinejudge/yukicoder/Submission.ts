import { createProblemKey } from "@/types/CommonProblem";
import type { Submission, SubmissionVerdict } from "@/types/Submission";
import { Resource } from "@prisma/client";

export class YukicoderSubmission implements Submission {
	private readonly No: number;
	private readonly ProblemId: number;
	private readonly Title: string;
	private readonly AuthorId: number;
	private readonly TesterIds: string;
	private readonly Level: number;
	private readonly ProblemType: number;
	private readonly Tags: string;
	private readonly _Date: string;
	constructor({
		No,
		ProblemId,
		Title,
		AuthorId,
		TesterIds,
		Level,
		ProblemType,
		Tags,
		_Date,
	}: {
		No: number;
		ProblemId: number;
		Title: string;
		AuthorId: number;
		TesterIds: string;
		Level: number;
		ProblemType: number;
		Tags: string;
		_Date: string;
	}) {
		this.No = No;
		this.ProblemId = ProblemId;
		this.Title = Title;
		this.AuthorId = AuthorId;
		this.TesterIds = TesterIds;
		this.Level = Level;
		this.ProblemType = ProblemType;
		this.Tags = Tags;
		this._Date = _Date;
	}
	Resource() {
		return Resource.YUKICODER;
	}
	ProblemKey() {
		return createProblemKey({
			resource: this.Resource(),
			contestId: "0",
			problemId: this.No.toString(),
		});
	}
	Verdict(): SubmissionVerdict {
		return "AC";
	}
}
