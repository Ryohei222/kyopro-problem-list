import { prisma } from "@/prisma";
import { AojProblem } from "../Problem";

export async function getAojProblems(): Promise<AojProblem[]> {
	const dbProblems = await prisma.aojProblem.findMany({});
	return dbProblems.map(
		(problem) => new AojProblem(problem.name, problem.id, problem.maxScore),
	);
}
