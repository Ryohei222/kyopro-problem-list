import { Problem } from "@/features/problem/types/Problem";
import { ProblemProvider } from "@prisma/client";

type Props =
  | {
      problemProvider: ProblemProvider.ATCODER | ProblemProvider.CODEFORCES;
      problemId: string;
      contestId: string;
    }
  | {
      problemProvider: ProblemProvider.AOJ | ProblemProvider.YUKICODER;
      problemId: string;
      contestId: string;
    };

export const buildProblemUrl = (props: Props): string => {
  const { problemProvider, problemId, contestId } = props;
  switch (problemProvider) {
    case ProblemProvider.AOJ:
      return `https://onlinejudge.u-aizu.ac.jp/problems/${problemId}`;
    case ProblemProvider.ATCODER:
      return `https://atcoder.jp/contests/${contestId}/tasks/${problemId}`;
    case ProblemProvider.CODEFORCES:
      return `https://codeforces.com/contest/${contestId}/problem/${problemId}`;
    case ProblemProvider.YUKICODER:
      return `https://yukicoder.me/problems/no/${problemId}`;
  }
};
