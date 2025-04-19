import { createProblemKey } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import type { CommonContest } from "../interfaces/CommonContest";
import type { CommonProblem } from "../interfaces/CommonProblem";
import type { GetDifficulty } from "../interfaces/GetDifficulty";

export class AtcoderProblem
	implements CommonProblem, CommonContest, GetDifficulty
{
	resource: Resource;
	contestId: string;
	problemId: string;
	name: string;
	contestName: string;
	difficulty?: number | undefined;
	constructor(
		id: string,
		contest_id: string,
		problem_index: string,
		name: string,
		title: string,
		contest_title: string,
		difficulty?: number,
	) {
		this.resource = Resource.ATCODER;
		this.contestId = contest_id;
		this.problemId = id;
		this.name = name;
		this.contestName = contest_title;
		this.difficulty = difficulty;
	}

	getResource() {
		return Resource.ATCODER;
	}
	getProblemKey() {
		return createProblemKey({
			resource: this.getResource(),
			contestId: this.contestId,
			problemId: this.problemId,
		});
	}
	getTitle() {
		return this.name;
	}
	getUrl() {
		return `https://atcoder.jp/contests/${this.contestId}/tasks/${this.problemId}`;
	}
	getContestTitle() {
		return this.contestName;
	}
	getContestUrl() {
		return `https://atcoder.jp/contests/${this.contestId}`;
	}
	getDifficulty() {
		return 0;
	}
}
