import { getAtcoderProblems } from "./atcoder/getProblems";
import type { OnlineJudge } from "./interfaces/OnlineJudge";

export const Atcoder: OnlineJudge = {
	getProblems: getAtcoderProblems,
};
