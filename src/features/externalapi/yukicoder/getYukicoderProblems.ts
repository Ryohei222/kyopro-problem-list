import type { CommonProblem } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { YukicoderProblemsApiSchema } from "./ProblemsSchema";
import { YUKICODER_API_URL } from "./constant";

export async function getYukicoderProblems(): Promise<CommonProblem[]> {
	return fetchApi(
		`${YUKICODER_API_URL}/problems`,
		YukicoderProblemsApiSchema,
	).then((data) => {
		return data
			.map((problem) => {
				return {
					resource: Resource.YUKICODER,
					contestId: "0",
					problemId: problem.No ? problem.No.toString() : "unknown",
					name: problem.Title,
					difficulty: null,
					contestName: null,
				};
			})
			.filter((problem) => problem.problemId !== "unknown");
	});
}
