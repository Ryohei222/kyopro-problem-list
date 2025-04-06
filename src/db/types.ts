import { Prisma } from "@prisma/client";
import { getProblemSetById } from "../features/problemset/db/ProblemSet";
import { getPublicProblemSets } from "../features/problemset-list/db/getPublicProblemSets";

export type queryPublicProblemSets = Prisma.PromiseReturnType<typeof getPublicProblemSets>;
export type queryProblemSetDetail = Prisma.PromiseReturnType<typeof getProblemSetById>;
