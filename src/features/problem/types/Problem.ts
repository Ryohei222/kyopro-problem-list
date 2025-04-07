import { ProblemProvider } from "@prisma/client";
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type APIProblem = {
    provider: ProblemProvider;
    contestId: string;
    problemId: string;
    title: string;
};

type CreatedProblem = NonNullable<Prisma.PromiseReturnType<typeof prisma.problem.findFirst>>;

export type { APIProblem, CreatedProblem };
