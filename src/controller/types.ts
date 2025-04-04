import { Prisma } from '@prisma/client'
import { getProblemSetById } from './ProblemSet'
import { getPublicProblemSets } from './problemList';

export type queryPublicProblemSets = Prisma.PromiseReturnType<typeof getPublicProblemSets>;
export type queryProblemSetDetail = Prisma.PromiseReturnType<typeof getProblemSetById>;