"use server";

import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import { MofeProblem } from "../Problem";

export async function readMofeProblems(): Promise<
	ProblemWithCommonId<MofeProblem>[]
> {
	const dbProblems = await prisma.mofeProblem.findMany({});
	return dbProblems.map((problem) => {
		return {
			commonProblemId: problem.commonProblemId,
			problem: new MofeProblem(problem),
		};
	});
}
