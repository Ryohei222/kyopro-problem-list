import { describe, expect, test } from "vitest";
import { OnlineJudgeProblemUpdaters } from "./OnlineJudges";

describe("Online Judges Tests", async () => {
	test(
		"Online Judges",
		async () => {
			const updated = await Promise.all(
				Object.values(OnlineJudgeProblemUpdaters).map(async (oj) => {
					const result = await oj.fetchAndUpdateProblems();
					console.log(
						`Updated ${oj.constructor.name}: ${result.updatedProblems} updated, ${result.newProblems} new`,
					);
				}),
			);
		},
		180 * 1000,
	);
});
