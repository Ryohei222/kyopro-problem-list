import { ProblemProvider } from "@prisma/client";
import { APIProblem } from "../types/Problem";
import AOJProblemsFetcher from "./fetchers/AOJProblemsFetcher";
import AtCoderProblemsFetcher from "./fetchers/AtCoderProblemsFetcher";
import CodeforcesProblemsFetcher from "./fetchers/CodeforcesProblemsFetcher";
import YukicoderProblemsFetcher from "./fetchers/YukicoderProblemsFetcher";
import { API_URLS } from "../constants/api-urls";
import MOFEProblemsFetcher from "./fetchers/MOFEProblemsFetcher";

export default async function fetchProblems(
    problemProvider: ProblemProvider,
): Promise<APIProblem[]> {
    switch (problemProvider) {
        case ProblemProvider.ATCODER:
            return await AtCoderProblemsFetcher(API_URLS.ATCODER);
        case ProblemProvider.CODEFORCES:
            return await CodeforcesProblemsFetcher(API_URLS.CODEFORCES);
        case ProblemProvider.AOJ:
            return await AOJProblemsFetcher(API_URLS.AOJ);
        case ProblemProvider.YUKICODER:
            return await YukicoderProblemsFetcher(API_URLS.YUKICODER);
        case ProblemProvider.MOFE:
            return await MOFEProblemsFetcher(API_URLS.MOFE);
        default:
            throw new Error("Unknown problem provider");
    }
}
