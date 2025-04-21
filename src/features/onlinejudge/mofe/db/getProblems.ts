import { prisma } from "@/prisma";
import { MofeProblem } from "../Problem";

export async function getMofeProblems(): Promise<MofeProblem[]> {
	const entries = await prisma.mofeProblem.findMany({});
	return entries.map(
		(d) => new MofeProblem(d.slug, d.contestSlug, d.name, d.contestName),
	);
}
