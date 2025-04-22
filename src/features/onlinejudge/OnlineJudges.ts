import { AojProblemUpdater } from "./aoj/Aoj";
import { fetchAojProblems } from "./aoj/fetchProblems";
import { AtcoderProblemUpdater } from "./atcoder/Atcoder";
import { fetchAtcoderProblems } from "./atcoder/fetchProblems";
import { MofeProblemUpdater } from "./mofe/Mofe";
import { readMofeProblems } from "./mofe/db/readProblems";
import { YukicoderProblemUpdater } from "./yukicoder/Yukicoder";
import { fetchYukicoderProblems } from "./yukicoder/fetchProblems";

export const ClientSideOnlineJudgeProblemFetchers = {
	Aoj: fetchAojProblems,
	Atcoder: fetchAtcoderProblems,
	Mofe: async () => {
		return (await readMofeProblems()).map((problem) => problem.problem);
	},
	Yukicoder: fetchYukicoderProblems,
};

export const OnlineJudgeProblemUpdaters = {
	Aoj: new AojProblemUpdater(),
	Atcoder: new AtcoderProblemUpdater(),
	Mofe: new MofeProblemUpdater(),
	Yukicoder: new YukicoderProblemUpdater(),
};
