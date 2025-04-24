"use server";

import { prisma } from "@/prisma";

export async function readMofeProblemsAsPlainObjects() {
	const dbProblems = await prisma.mofeProblem.findMany({});
	return dbProblems;
}
