import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { YUKICODER_API_URL } from "./constant";
import { YukicoderProblemsApiSchema } from "./ProblemsSchema";
import { CommonProblem } from "@/types/Problem";

export async function getYukicoderProblems(): Promise<CommonProblem[]> {
    return await fetchApi(`${YUKICODER_API_URL}/problems`, YukicoderProblemsApiSchema).then(
        (data) => {
            return data
                .map((problem) => {
                    return {
                        resource: Resource.YUKICODER,
                        contestId: "0",
                        problemId: problem.No ? problem.No.toString() : "unknown",
                        name: problem.Title,
                    };
                })
                .filter((problem) => problem.problemId !== "unknown");
        },
    );
}
