import { CommonProblem } from "@/types/Problem";
import { Resource } from "@prisma/client";
import { getAojProblems } from "./aoj/getAojProblems";
import { getAtcoderProblems } from "./atcoder/getAtcoderProblems";
import { getCodeforcesProblems } from "./codeforces/getCodeforcesProblems";
import { getYukicoderProblems } from "./yukicoder/getYukicoderProblems";
import { getInnerMofeProblems } from "./mofe/getInnerMofeProblems";

export async function getProblems(resource: Resource): Promise<CommonProblem[]> {
    switch (resource) {
        case Resource.AOJ:
            return await getAojProblems();
        case Resource.ATCODER:
            return await getAtcoderProblems();
        case Resource.CODEFORCES:
            return await getCodeforcesProblems();
        case Resource.MOFE:
            return await getInnerMofeProblems();
        case Resource.YUKICODER:
            return await getYukicoderProblems();
    }
}
