import { ProblemProvider } from "@prisma/client";

export default function extractProblemFromUrl(url: string): {
    contestId: string;
    problemId: string;
    problemProvider: ProblemProvider;
} | null {
    const AtCoderProblemURLRegex =
        /https:\/\/atcoder\.jp\/contests\/(?<contestId>.+)\/tasks\/(?<problemId>.+)/;
    const CodeforcesProblemURLRegex =
        /https:\/\/codeforces\.com\/contest\/(?<contestId>.+)\/problem\/(?<problemId>.+)/;
    const YukicoderProblemURLRegex = /https:\/\/yukicoder\.me\/problems\/no\/(?<problemId>.+)/;
    const AOJProblemURLRegex = /https:\/\/onlinejudge\.u-aizu\.ac\.jp\/problems\/(?<problemId>.+)/;
    const MOFEProblemURLRegex =
        /https:\/\/mofecoder\.com\/contests\/(?<contestId>.+)\/tasks\/(?<problemId>.+)/;

    const Regexes: Map<ProblemProvider, RegExp> = new Map([
        [ProblemProvider.ATCODER, AtCoderProblemURLRegex],
        [ProblemProvider.CODEFORCES, CodeforcesProblemURLRegex],
        [ProblemProvider.YUKICODER, YukicoderProblemURLRegex],
        [ProblemProvider.AOJ, AOJProblemURLRegex],
        [ProblemProvider.MOFE, MOFEProblemURLRegex],
    ]);

    function findMatch(regex: RegExp, url: string, problemProvider: ProblemProvider) {
        const match = url.match(regex);
        if (match?.groups?.problemId) {
            const contestId = match.groups.contestId || "0";
            const problemId = match.groups.problemId || "";
            return { contestId, problemId, problemProvider };
        }
        return null;
    }

    for (const [provider, regex] of Regexes) {
        const match = findMatch(regex, url, provider);
        if (match) {
            return match;
        }
    }
    return null;
}
