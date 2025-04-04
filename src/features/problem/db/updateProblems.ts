import { ProblemProvider } from "@prisma/client";
import { CreatedProblem } from "../types/Problem";
import updateAtCoderProblems from "./updateAtCoderProblems";
import updateCodeforcesProblems from "./updateCodeforcesProblems";
import updateYukicoderProblems from "./updateYukicoderProblems";
import updateAOJProblems from "./updateAOJProblems";

export async function updateProblems(problemProvider: ProblemProvider): Promise<CreatedProblem[]> {
    switch (problemProvider) {
        case ProblemProvider.ATCODER:
            return await updateAtCoderProblems();
        case ProblemProvider.CODEFORCES:
            return await updateCodeforcesProblems();
        case ProblemProvider.YUKICODER:
            return await updateYukicoderProblems();
        case ProblemProvider.AOJ:
            return await updateAOJProblems();
        default:
            console.error("Unsupported problem provider:", problemProvider);
            break;
    }
    return [];
}