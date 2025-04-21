import { prisma } from "@/prisma";
import type { ProblemWithCommonId } from "../../interfaces/ProblemWithCommonId";
import { AtcoderProblem } from "../Problem";

export async function readAtcoderProblems(): Promise<
	ProblemWithCommonId<AtcoderProblem>[]
> {
	const entries = await prisma.atcoderProblem.findMany({});
	return entries.map((entry) => ({
		commonProblemId: entry.commonProblemId,
		problem: new AtcoderProblem(
			entry.id,
			entry.contestId,
			entry.name,
			entry.contestName,
			entry.difficulty ?? undefined,
		),
	}));
}
