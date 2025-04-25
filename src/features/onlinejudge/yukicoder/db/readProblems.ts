import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import { YukicoderProblem } from "../Problem";

export async function readYukicoderProblems(): Promise<
	ProblemWithCommonId<YukicoderProblem>[]
> {
	const dbProblems = await prisma.yukicoderProblem.findMany({});
	return dbProblems.map((problem) => {
		return {
			commonProblemId: problem.commonProblemId,
			problem: new YukicoderProblem(problem),
		};
	});
}
