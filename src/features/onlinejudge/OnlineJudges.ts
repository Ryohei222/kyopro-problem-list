import { AojProblemUpdater } from "./aoj/Aoj";
import { AtcoderProblemUpdater } from "./atcoder/Atcoder";
import { CodeforcesProblemUpdater } from "./codeforces/Codeforces";
import { YukicoderProblemUpdater } from "./yukicoder/Yukicoder";

export const OnlineJudgeProblemUpdaters = {
	Aoj: new AojProblemUpdater(),
	Atcoder: new AtcoderProblemUpdater(),
	Codeforces: new CodeforcesProblemUpdater(),
	Yukicoder: new YukicoderProblemUpdater(),
};
