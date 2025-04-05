export default function extractProblemFromUrl(url: string): { contestId: string; problemId: string } | null {
    const AtCoderProblemURLRegex = /https:\/\/atcoder\.jp\/contests\/<contestId>\/tasks\/<problemId>/;
    const CodeforcesProblemURLRegex = /https:\/\/codeforces\.com\/contest\/<contestId>\/problem\/<problemId>/;
    const YukicoderProblemURLRegex = /https:\/\/yukicoder\.me\/problems\/<problemId>/;
    const AOJProblemURLRegex = /https:\/\/onlinejudge\.u-aizu\.ac\.jp\/problems\/<problemId>/;

    const regexes = [
        AtCoderProblemURLRegex,
        CodeforcesProblemURLRegex,
        YukicoderProblemURLRegex,
        AOJProblemURLRegex,
    ];

    for (const regex of regexes) {
        const match = url.match(regex);
        if (match?.groups?.problemId) {
            const contestId = match.groups.contestId || "0";
            const problemId = match.groups.problemId || "";
            return { contestId, problemId };
        }
    }
    return null;
}
