import { ProblemUpdater } from "../ProblemsUpdater";
import type { CodeforcesProblem } from "./Problem";
import { createCodeforcesProblems } from "./db/createProblems";
import { readCodeforcesProblems } from "./db/getProblems";
import { updateCodeforcesProblems } from "./db/updateProblems";
import { fetchCodeforcesProblems } from "./fetchProblems";

export class CodeforcesProblemUpdater extends ProblemUpdater<CodeforcesProblem> {
	fetchProblems = fetchCodeforcesProblems;
	createProblems = createCodeforcesProblems;
	readProblems = readCodeforcesProblems;
	updateProblems = updateCodeforcesProblems;
}
