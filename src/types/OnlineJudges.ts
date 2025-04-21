import { fetchAojProblems } from "../features/onlinejudge/aoj/fetchProblems";
import { fetchAojSubmissions } from "../features/onlinejudge/aoj/fetchSubmissions";
import { fetchAtcoderProblems } from "../features/onlinejudge/atcoder/fetchProblems";
import { fetchAtcoderSubmissionsWithCache } from "../features/onlinejudge/atcoder/fetchSubmissions";
import { fetchCodeforcesProblems } from "../features/onlinejudge/codeforces/fetchProblems";
import { fetchCodeforcesSubmissions } from "../features/onlinejudge/codeforces/fetchSubmissions";
import { fetchYukicoderProblems } from "../features/onlinejudge/yukicoder/fetchProblems";
import { fetchYukicoderSubmissions } from "../features/onlinejudge/yukicoder/fetchSubmissions";
import type { OnlineJudge } from "./OnlineJudge";

export const Atcoder: OnlineJudge = {
	fetchProblems: fetchAtcoderProblems,
	fetchSubmissions: fetchAtcoderSubmissionsWithCache,
};
export const Aoj: OnlineJudge = {
	fetchProblems: fetchAojProblems,
	fetchSubmissions: fetchAojSubmissions,
};
export const Codeforces: OnlineJudge = {
	fetchProblems: fetchCodeforcesProblems,
	fetchSubmissions: fetchCodeforcesSubmissions,
};
export const Yukicoder: OnlineJudge = {
	fetchProblems: fetchYukicoderProblems,
	fetchSubmissions: fetchYukicoderSubmissions,
};

export const OnlineJudges = {
	Atcoder,
	Aoj,
	Codeforces,
	Yukicoder,
} as const;
