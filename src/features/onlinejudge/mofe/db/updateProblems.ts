import { prisma } from "@/prisma";
import { createProblemIds } from "../../db/createProblemIds";
import { mergeIdsAndProblems } from "../../utils/mergeIdAndProblem";
import type { MofeProblem } from "../Problem";
import { getMofeProblems } from "./getProblems";

export async function updateMofeProblems(
	problems: MofeProblem[],
): Promise<void> {
	const existing = await getMofeProblems();
	const map = new Map(existing.map((p) => [p.ProblemKey(), p]));
	const newItems = problems.filter((p) => !map.has(p.ProblemKey()));
	const ids = await createProblemIds(newItems.length);
	const merged = mergeIdsAndProblems(ids, newItems).map((item) => ({
		commonProblemId: item.commonProblemId,
		...item.problem.Unpack(),
	}));
	await prisma.mofeProblem.createMany({
		data: merged,
	});
}
