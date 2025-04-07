import { ProblemProvider } from "@prisma/client";

export type PUTRequestBody = {
    id: number;
    name: string;
    description: string;
    isPublic: boolean;
    problemSetProblems: {
        problemProvider: ProblemProvider;
        contestId: string;
        problemId: string;
        title: string;
        memo: string;
        hint: string;
        order: number;
    }[];
};

export type PUTResponseBody = {
    success: boolean;
};
