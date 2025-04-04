import { Problem } from "@/types/Problem";

export const buildProblemUrl = (problem: Problem): string => {
    const { provider, contestId, problemId } = problem;
    switch (provider) {
        case "codeforces":
            return `https://codeforces.com/contest/${contestId}/problem/${problemId}`;
        case "atcoder":
            return `https://atcoder.jp/contests/${contestId}/tasks/${problemId}`;
    }
    return "";
};