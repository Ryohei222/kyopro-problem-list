import { prisma } from "@/prisma";
import { CodeforcesProblem } from "../Problem";

export async function getCodeforcesProblems(): Promise<CodeforcesProblem[]> {
	const entries = await prisma.codeforcesProblem.findMany({});
	return entries.map(
		(d) =>
			new CodeforcesProblem(
				d.contestId,
				d.name,
				d.contestName,
				d.index,
				d.points ?? undefined,
				d.rating ?? undefined,
			),
	);
}
