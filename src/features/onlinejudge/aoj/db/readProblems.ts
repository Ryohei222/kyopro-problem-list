import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import { AojProblem } from "../Problem";

export async function readAojProblems(): Promise<
	ProblemWithCommonId<AojProblem>[]
> {
	const dbProblems = await prisma.aojProblem.findMany({});
	return dbProblems.map((problem) => {
		return {
			commonProblemId: problem.commonProblemId,
			problem: new AojProblem(problem),
		};
	});
}
