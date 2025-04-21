import { prisma } from "@/prisma";
import { createProblemIds } from "../../db/createProblemIds";
import { mergeIdsAndProblems } from "../../utils/mergeIdAndProblem";
import type { AojProblem } from "../Problem";
import { getAojProblems } from "./getProblems";

export async function updateAojProblems(problems: AojProblem[]) {
	const dbProblems = await getAojProblems();
	const dbProblemMap = new Map(
		dbProblems.map((problem) => [problem.ProblemKey(), problem]),
	);

	const newProblems = problems.filter(
		(problem) => !dbProblemMap.has(problem.ProblemKey()),
	);

	const createdProblemIds = await createProblemIds(newProblems.length);
	const mergedProblems = mergeIdsAndProblems(
		createdProblemIds,
		newProblems,
	).map((problem) => ({
		commonProblemId: problem.commonProblemId,
		...problem.problem.Unpack(),
	}));

	await prisma.aojProblem.createMany({
		data: mergedProblems,
	});
}
