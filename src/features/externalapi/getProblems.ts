import type { CommonProblem } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import { getAojProblems } from "./aoj/getAojProblems";
import { getAtcoderProblems } from "./atcoder/getAtcoderProblems";
import { getCodeforcesProblems } from "./codeforces/getCodeforcesProblems";
import { getInnerMofeProblems } from "./mofe/getInnerMofeProblems";
import { getYukicoderProblems } from "./yukicoder/getYukicoderProblems";

export async function getProblems(
	resource: Resource,
): Promise<CommonProblem[]> {
	switch (resource) {
		case Resource.AOJ:
			return getAojProblems();
		case Resource.ATCODER:
			return getAtcoderProblems();
		case Resource.CODEFORCES:
			return getCodeforcesProblems();
		case Resource.MOFE:
			return getInnerMofeProblems();
		case Resource.YUKICODER:
			return getYukicoderProblems();
	}
}
