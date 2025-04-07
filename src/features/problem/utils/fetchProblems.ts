import { ProblemProvider } from "@prisma/client";
import { APIProblem } from "../types/Problem";
import fetchAtCoderProblems from "./fetchAtCoderProblems";
import fetchCodeforcesProblems from "./fetchCodeforcesProblems";
import fetchAOJProblems from "./fetchAOJProblems";
import fetchYukicoderProblems from "./fetchYukicoderProblems";

export default async function fetchProblems(
    problemProvider: ProblemProvider,
): Promise<APIProblem[]> {
    switch (problemProvider) {
        case ProblemProvider.ATCODER:
            return await fetchAtCoderProblems();
        case ProblemProvider.CODEFORCES:
            return await fetchCodeforcesProblems();
        case ProblemProvider.AOJ:
            return await fetchAOJProblems();
        case ProblemProvider.YUKICODER:
            return await fetchYukicoderProblems();
        default:
            throw new Error("Unknown problem provider");
    }
}
