import { ProblemUpdater } from "../ProblemsUpdater";
import type { AtcoderProblem } from "./Problem";
import { createAtcoderProblems } from "./db/createProblems";
import { readAtcoderProblems } from "./db/readProblems";
import { updateAtcoderProblems } from "./db/updateProblems";
import { fetchAtcoderProblems } from "./fetchProblems";

export class AtcoderProblemUpdater extends ProblemUpdater<AtcoderProblem> {
	fetchProblems = fetchAtcoderProblems;
	createProblems = createAtcoderProblems;
	readProblems = readAtcoderProblems;
	updateProblems = updateAtcoderProblems;
}
