import { fetchAojProblems } from "./aoj/fetchProblems";
import { fetchAojSubmissions } from "./aoj/fetchSubmissions";
import { fetchAtcoderProblems } from "./atcoder/fetchProblems";
import { fetchAtcoderSubmissions } from "./atcoder/fetchSubmissions";
import { fetchCodeforcesProblems } from "./codeforces/fetchProblems";
import { fetchCodeforcesSubmissions } from "./codeforces/fetchSubmissions";
import type { OnlineJudge } from "./interfaces/OnlineJudge";
import { fetchYukicoderProblems } from "./yukicoder/fetchProblems";
import { fetchYukicoderSubmissions } from "./yukicoder/fetchSubmissions";

export const Atcoder: OnlineJudge = {
	fetchProblems: fetchAtcoderProblems,
	fetchSubmissions: fetchAtcoderSubmissions,
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
