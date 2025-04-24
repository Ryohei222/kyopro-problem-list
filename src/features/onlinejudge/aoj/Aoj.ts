import { ProblemUpdater } from "../ProblemsUpdater";
import type { AojProblem } from "./Problem";
import { createAojProblems } from "./db/createProblems";
import { readAojProblems } from "./db/readProblems";
import { updateAojProblems } from "./db/updateProblems";
import { fetchAojProblems } from "./fetchProblems";

export class AojProblemUpdater extends ProblemUpdater<AojProblem> {
	fetchProblems = fetchAojProblems;
	createProblems = createAojProblems;
	readProblems = readAojProblems;
	updateProblems = updateAojProblems;
}
