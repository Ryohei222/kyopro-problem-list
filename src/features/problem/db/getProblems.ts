import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

export async function getProblems(): Promise<
  Prisma.PromiseReturnType<typeof prisma.problem.findMany>
> {
  const problems = await prisma.problem.findMany({});
  return problems;
}
