import { prisma } from "@/prisma";
import type { CommonProblem } from "@/types/CommonProblem";
import { createProblemIds } from "./db/createProblemIds";
import type { CreateProblems } from "./interfaces/CreateProblems";
import type { FetchProblems } from "./interfaces/FetchProblems";
import type { ProblemWithCommonId } from "./interfaces/ProblemWithCommonId";
import type { ReadProblems } from "./interfaces/ReadProblems";
import type { UpdateProblems } from "./interfaces/UpdateProblems";

export abstract class ProblemUpdater<T extends CommonProblem>
	implements
		FetchProblems<T>,
		CreateProblems<T>,
		ReadProblems<T>,
		UpdateProblems<T>
{
	abstract fetchProblems(): Promise<T[]>;
	abstract createProblems(problems: ProblemWithCommonId<T>[]): Promise<void>;
	abstract readProblems(): Promise<ProblemWithCommonId<T>[]>;
	abstract updateProblems(
		problemWithCommonIds: ProblemWithCommonId<T>[],
	): Promise<void>;

	fetchAndUpdateProblems = async () => {
		const problems = await this.fetchProblems();
		const existingProblems = await this.readProblems();
		const existingProblemsMap = new Map<string, ProblemWithCommonId<T>>(
			existingProblems.map((problem) => [
				problem.problem.ProblemKey(),
				problem,
			]),
		);
		const newProblems = problems.filter(
			(problem) => existingProblemsMap.get(problem.ProblemKey()) === undefined,
		);
		const problemsToUpdate = problems.filter((problem) => {
			const existingProblem = existingProblemsMap.get(problem.ProblemKey());
			if (existingProblem === undefined) return false;
			return problem.Stringify() !== existingProblem.problem.Stringify();
		});

		return await prisma.$transaction(async () => {
			const newProblemIds = await createProblemIds(newProblems.length);
			console.log(newProblemIds);
			await this.createProblems(
				newProblems.map((problem, index) => ({
					commonProblemId: newProblemIds[index],
					problem: problem,
				})),
			);

			console.log(problemsToUpdate);
			await this.updateProblems(
				problemsToUpdate.map((problem) => {
					const existingProblem = existingProblemsMap.get(problem.ProblemKey());
					if (existingProblem === undefined)
						throw new Error("Problem not found");
					return {
						commonProblemId: existingProblem.commonProblemId,
						problem: problem,
					};
				}),
			);

			return {
				updatedProblems: problemsToUpdate.length,
				newProblems: newProblems.length,
			};
		});
	};
}
