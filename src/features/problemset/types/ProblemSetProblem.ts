import { ProblemProvider } from "@prisma/client";

export type ProblemSetProblem = {
    problem: {
        id: number;
        problemId: string;
        provider: ProblemProvider;
        contestId: string;
        title: string;
        difficulty: number | null;
    };
    memo: string;
    hint: string;
    order: number;
};
