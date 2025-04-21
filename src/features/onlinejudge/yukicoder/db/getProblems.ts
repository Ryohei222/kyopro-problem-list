import { prisma } from "@/prisma";
import { YukicoderProblem } from "../Problem";

export async function getYukicoderProblems(): Promise<YukicoderProblem[]> {
	const entries = await prisma.yukicoderProblem.findMany({});
	return entries.map(
		(d) => new YukicoderProblem(d.No, d.ProblemId, d.Title, d.Level),
	);
}
