import { Resource } from "@/types/Resource";

export default function extractProblemFromUrl(url: string): {
	contestId: string;
	problemId: string;
	resource: Resource;
} | null {
	const AtCoderProblemURLRegex = [
		/https:\/\/atcoder\.jp\/contests\/(?<contestId>.+)\/tasks\/(?<problemId>.+)/,
	];
	const CodeforcesProblemURLRegex = [
		/https:\/\/codeforces\.com\/contest\/(?<contestId>.+)\/problem\/(?<problemId>.+)/,
		/https:\/\/codeforces\.com\/problemset\/problem\/(?<contestId>.+)\/(?<problemId>.+)/,
	];
	const YukicoderProblemURLRegex = [
		/https:\/\/yukicoder\.me\/problems\/no\/(?<problemId>.+)/,
	];
	const AOJProblemURLRegex = [
		/https:\/\/onlinejudge\.u-aizu\.ac\.jp\/.+\/(?<problemId>.+)/,
		/https:\/\/judge\.u-aizu\.ac\.jp\/onlinejudge\/description.jsp\?id=(?<problemId>.+)/,
	];
	const MOFEProblemURLRegex = [
		/https:\/\/mofecoder\.com\/contests\/(?<contestId>.+)\/tasks\/(?<problemId>.+)/,
	];

	const Regexes: Map<Resource, RegExp[]> = new Map([
		[Resource.AOJ, AOJProblemURLRegex],
		[Resource.ATCODER, AtCoderProblemURLRegex],
		[Resource.CODEFORCES, CodeforcesProblemURLRegex],
		[Resource.MOFE, MOFEProblemURLRegex],
		[Resource.YUKICODER, YukicoderProblemURLRegex],
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
	for (const [resource, regexes] of Regexes) {
		for (const regex of regexes) {
			const match = findMatch(regex, url, resource);
			if (match) {
				return match;
			}
		}
	}
	return null;
}
