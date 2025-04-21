import { prisma } from "@/prisma";
import { createProblemIds } from "../../db/createProblemIds";
import { mergeIdsAndProblems } from "../../utils/mergeIdAndProblem";
import type { AtcoderProblem } from "../Problem";
import { getAtcoderProblems } from "./getProblems";

export async function updateAtcoderProblems(
	problems: AtcoderProblem[],
): Promise<void> {
	const existing = await getAtcoderProblems();
	const map = new Map(existing.map((p) => [p.ProblemKey(), p]));
	const newItems = problems.filter((p) => !map.has(p.ProblemKey()));
	const ids = await createProblemIds(newItems.length);
	const merged = mergeIdsAndProblems(ids, newItems).map((item) => ({
		commonProblemId: item.commonProblemId,
		...item.problem.Unpack(),
	}));
	await prisma.atcoderProblem.createMany({ data: merged });
}
