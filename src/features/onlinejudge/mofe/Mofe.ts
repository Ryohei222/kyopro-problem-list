import { ProblemUpdater } from "../ProblemsUpdater";
import type { MofeProblem } from "./Problem";
import { createMofeProblems } from "./db/createProblems";
import { readMofeProblems } from "./db/readProblems";
import { updateMofeProblems } from "./db/updateProblems";
import { fetchMofeProblems } from "./fetchMofeProblems";

export class MofeProblemUpdater extends ProblemUpdater<MofeProblem> {
	fetchProblems = fetchMofeProblems;
	createProblems = createMofeProblems;
	readProblems = readMofeProblems;
	updateProblems = updateMofeProblems;
}
