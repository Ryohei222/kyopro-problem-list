import type { CommonProblem } from "@/types/CommonProblem";
import type { Resource } from "@/types/Resource";
import type { Submission } from "@/types/Submission";
import { AojProblemUpdater } from "./aoj/Aoj";
import { fetchAojProblems } from "./aoj/fetchProblems";
import { fetchAojSubmissions } from "./aoj/fetchSubmissions";
import { AtcoderProblemUpdater } from "./atcoder/Atcoder";
import { fetchAtcoderProblems } from "./atcoder/fetchProblems";
import { fetchAtcoderSubmissionsWithCache } from "./atcoder/fetchSubmissions";
import { CodeforcesProblemUpdater } from "./codeforces/Codeforces";
import { fetchCodeforcesProblems } from "./codeforces/fetchProblems";
import { fetchCodeforcesSubmissionsWithCache } from "./codeforces/fetchSubmissions";
import { MofeProblemUpdater } from "./mofe/Mofe";
import { MofeProblem } from "./mofe/Problem";
import { readMofeProblemsAsPlainObjects } from "./mofe/db/readProblemsAsPlainObjects";
import { YukicoderProblemUpdater } from "./yukicoder/Yukicoder";
import { fetchYukicoderProblems } from "./yukicoder/fetchProblems";
import { fetchYukicoderSubmissions } from "./yukicoder/fetchSubmissions";

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
		fetchSubmissions: fetchCodeforcesSubmissionsWithCache,
	},
	MOFE: {
		fetchProblems: async () => {
			const problems = await readMofeProblemsAsPlainObjects();
			return problems.map((problem) => new MofeProblem(problem));
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
