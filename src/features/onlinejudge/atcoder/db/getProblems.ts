import { prisma } from "@/prisma";
import { AtcoderProblem } from "../Problem";

export async function getAtcoderProblems(): Promise<AtcoderProblem[]> {
	const dbEntries = await prisma.atcoderProblem.findMany({});
	return dbEntries.map(
		(d) =>
			new AtcoderProblem(
				d.id,
				d.contestId,
				d.name,
				d.contestName,
				d.difficulty ?? undefined,
			),
	);
}
