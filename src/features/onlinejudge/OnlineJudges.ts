import type { CommonProblem } from "@/types/CommonProblem";
import type { Submission } from "@/types/Submission";
import type { Resource } from "@prisma/client";
import { AojProblemUpdater } from "./aoj/Aoj";
import { fetchAojProblems } from "./aoj/fetchProblems";
import { fetchAojSubmissions } from "./aoj/fetchSubmissions";
import { AtcoderProblemUpdater } from "./atcoder/Atcoder";
import { fetchAtcoderProblems } from "./atcoder/fetchProblems";
import { fetchAtcoderSubmissionsWithCache } from "./atcoder/fetchSubmissions";
import { CodeforcesProblemUpdater } from "./codeforces/Codeforces";
import { fetchCodeforcesProblems } from "./codeforces/fetchProblems";
import { fetchCodeforcesSubmissions } from "./codeforces/fetchSubmissions";
import { MofeProblemUpdater } from "./mofe/Mofe";
import { readMofeProblems } from "./mofe/db/readProblems";
import { YukicoderProblemUpdater } from "./yukicoder/Yukicoder";
import { fetchYukicoderProblems } from "./yukicoder/fetchProblems";
import { fetchYukicoderSubmissions } from "./yukicoder/fetchSubmissions";

export const ClientSideOnlineJudgeProblemFetchers = {
	Aoj: fetchAojProblems,
	Atcoder: fetchAtcoderProblems,
	Codeforces: fetchCodeforcesProblems,
	Mofe: async () => {
		return (await readMofeProblems()).map((problem) => problem.problem);
	},
	Yukicoder: fetchYukicoderProblems,
};

interface ClientSideOnlineJudgeApi {
	fetchProblems: () => Promise<CommonProblem[]>;
	fetchSubmissions: (userId: string) => Promise<Submission[]>;
}

export const ClientSideOnlineJudgeApi: Record<
	Resource,
	ClientSideOnlineJudgeApi
> = {
	AOJ: {
		fetchProblems: fetchAojProblems,
		fetchSubmissions: fetchAojSubmissions,
	},
	ATCODER: {
		fetchProblems: fetchAtcoderProblems,
		fetchSubmissions: fetchAtcoderSubmissionsWithCache,
	},
	CODEFORCES: {
		fetchProblems: fetchCodeforcesProblems,
		fetchSubmissions: fetchCodeforcesSubmissions,
	},
	MOFE: {
		fetchProblems: async () => {
			return (await readMofeProblems()).map((problem) => problem.problem);
		},
		fetchSubmissions: async () => {
			return [];
		},
	},
	YUKICODER: {
		fetchProblems: fetchYukicoderProblems,
		fetchSubmissions: fetchYukicoderSubmissions,
	},
};

export const OnlineJudgeProblemUpdaters = {
	Aoj: new AojProblemUpdater(),
	Atcoder: new AtcoderProblemUpdater(),
	Codeforces: new CodeforcesProblemUpdater(),
	Mofe: new MofeProblemUpdater(),
	Yukicoder: new YukicoderProblemUpdater(),
};
