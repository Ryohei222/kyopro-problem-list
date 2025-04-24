import type { Resource } from "@prisma/client";

export default function extractProblemFromUrl(url: string): {
	contestId: string;
	problemId: string;
	resource: Resource;
} | null {
	const AtCoderProblemURLRegex =
		/https:\/\/atcoder\.jp\/contests\/(?<contestId>.+)\/tasks\/(?<problemId>.+)/;
	const CodeforcesProblemURLRegex =
		/https:\/\/codeforces\.com\/contest\/(?<contestId>.+)\/problem\/(?<problemId>.+)/;
	const YukicoderProblemURLRegex =
		/https:\/\/yukicoder\.me\/problems\/no\/(?<problemId>.+)/;
	const AOJProblemURLRegex =
		/https:\/\/onlinejudge\.u-aizu\.ac\.jp\/problems\/(?<problemId>.+)/;
	const MOFEProblemURLRegex =
		/https:\/\/mofecoder\.com\/contests\/(?<contestId>.+)\/tasks\/(?<problemId>.+)/;

	const Regexes: Map<Resource, RegExp> = new Map([
		["AOJ", AOJProblemURLRegex],
		["ATCODER", AtCoderProblemURLRegex],
		["CODEFORCES", CodeforcesProblemURLRegex],
		["MOFE", MOFEProblemURLRegex],
		["YUKICODER", YukicoderProblemURLRegex],
	]);

	function findMatch(regex: RegExp, url: string, resource: Resource) {
		const match = url.match(regex);
		if (match?.groups?.problemId) {
			const contestId = match.groups.contestId || "0";
			const problemId = match.groups.problemId || "";
			return { contestId, problemId, resource };
		}
		return null;
	}
	for (const [resource, regex] of Regexes) {
		const match = findMatch(regex, url, resource);
		if (match) {
			console.log(`Extracted problem from URL: ${JSON.stringify(match)}`);
			return match;
		}
	}
	return null;
}
