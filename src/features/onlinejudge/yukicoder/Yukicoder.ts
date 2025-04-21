import { ProblemUpdater } from "../ProblemsUpdater";
import type { YukicoderProblem } from "./Problem";
import { createYukicoderProblems } from "./db/createProblems";
import { readYukicoderProblems } from "./db/readProblems";
import { updateYukicoderProblems } from "./db/updateproblems";
import { fetchYukicoderProblems } from "./fetchProblems";

export class YukicoderProblemUpdater extends ProblemUpdater<YukicoderProblem> {
	fetchProblems = fetchYukicoderProblems;
	createProblems = createYukicoderProblems;
	updateProblems = updateYukicoderProblems;
	readProblems = readYukicoderProblems;
}
