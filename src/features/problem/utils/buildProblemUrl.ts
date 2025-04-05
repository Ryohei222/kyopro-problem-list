import { Problem } from "@/features/problem/types/Problem";
import { ProblemProvider } from "@prisma/client";

export const buildProblemUrl = (problem: Problem): string => {
    switch (problem.problemProvider) {
        case ProblemProvider.AOJ:
            return `https://onlinejudge.u-aizu.ac.jp/problems/${problem.problemId}`;
        case ProblemProvider.ATCODER:
            return `https://atcoder.jp/contests/${problem.contestId}/tasks/${problem.problemId}`;
        case ProblemProvider.CODEFORCES:
            return `https://codeforces.com/contest/${problem.contestId}/problem/${problem.problemId}`;
        case ProblemProvider.YUKICODER:
            return `https://yukicoder.me/problems/no/${problem.problemId}`;
    }
};