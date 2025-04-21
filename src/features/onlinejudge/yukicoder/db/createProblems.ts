import { prisma } from "@/prisma";
import { createProblemIds } from "../../db/createProblemIds";
import type { YukicoderProblem } from "../Problem";

export async function createYukicoderProblems(
	problems: YukicoderProblem[],
): Promise<YukicoderProblem[]> {
	const ids = await createProblemIds(problems.length);
	await prisma.yukicoderProblem.createMany({
		data: problems.map((p, i) => ({
			commonProblemId: ids[i],
			...p.Unpack(),
		})),
	});
	return problems;
}
