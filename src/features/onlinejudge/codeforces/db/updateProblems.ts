import { prisma } from "@/prisma";
import { createProblemIds } from "../../db/createProblemIds";
import { mergeIdsAndProblems } from "../../utils/mergeIdAndProblem";
import type { CodeforcesProblem } from "../Problem";
import { getCodeforcesProblems } from "./getProblems";

export async function updateCodeforcesProblems(
	problems: CodeforcesProblem[],
): Promise<void> {
	const existing = await getCodeforcesProblems();
	const map = new Map(existing.map((p) => [p.ProblemKey(), p]));
	const newItems = problems.filter((p) => !map.has(p.ProblemKey()));
	const ids = await createProblemIds(newItems.length);
	const merged = mergeIdsAndProblems(ids, newItems).map((item) => ({
		commonProblemId: item.commonProblemId,
		...item.problem.Unpack(),
	}));
	await prisma.codeforcesProblem.createMany({ data: merged });
}
