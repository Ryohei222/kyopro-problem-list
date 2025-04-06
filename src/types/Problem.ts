import { ProblemProvider } from "@prisma/client";

export type Problem = {
  provider: ProblemProvider;
  contestId: string;
  problemId: string;
  title: string;
  difficulty: number | null;
};
