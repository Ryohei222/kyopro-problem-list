import { Resource } from "@prisma/client";

type Props =
    | {
          resource: "ATCODER" | "CODEFORCES" | "MOFE";
          problemId: string;
          contestId: string;
      }
    | {
          resource: "AOJ" | "YUKICODER";
          problemId: string;
          contestId: string;
      };

export const buildProblemUrl = (props: Props): string => {
    const { resource, problemId, contestId } = props;
    switch (resource) {
        case Resource.AOJ:
            return `https://onlinejudge.u-aizu.ac.jp/problems/${problemId}`;
        case Resource.ATCODER:
            return `https://atcoder.jp/contests/${contestId}/tasks/${problemId}`;
        case Resource.CODEFORCES:
            return `https://codeforces.com/contest/${contestId}/problem/${problemId}`;
        case Resource.YUKICODER:
            return `https://yukicoder.me/problems/no/${problemId}`;
        case Resource.MOFE:
            return `https://mofecoder.com/contests/${contestId}/tasks/${problemId}`;
    }
};
