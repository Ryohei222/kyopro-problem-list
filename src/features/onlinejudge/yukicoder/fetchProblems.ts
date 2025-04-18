import { YukicoderProblemsApiSchema } from "../../externalapi/yukicoder/ProblemsSchema";
import type { CommonProblem } from "../interfaces/CommonProblem";
import { fetchApi } from "../utils/fetchApi";
import { YukicoderProblem } from "./Problem";
import { YUKICODER_API_URL } from "./constants";

export async function fetchYukicoderProblems(): Promise<CommonProblem[]> {
	const data = await fetchApi(
		`${YUKICODER_API_URL}/problems`,
		YukicoderProblemsApiSchema,
	);
	return data
		.map((p) =>
			p?.No ? new YukicoderProblem(p.No.toString(), p.Title) : undefined,
		)
		.filter((p) => p !== undefined);
}
