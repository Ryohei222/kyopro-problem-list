import { z } from "zod";
import { APIProblem } from "../types/Problem";

const YukicoderProblemSchema = z.object({
    No: z.number().nullable(),
    ProblemId: z.number(),
    Title: z.string(),
    AuthorId: z.number(),
    TesterIds: z.string(),
    Level: z.number(),
    ProblemType: z.number(),
    Tags: z.string(),
    Date: z.string().nullable(),
});

const YukicoderProblemsSchema = z.array(YukicoderProblemSchema);

export default async function fetchYukicoderProblems(): Promise<APIProblem[]> {
    const URL = "https://yukicoder.me/api/v1/problems";

    try {
        const res = await fetch(URL)
            .then((res) => res.json())
            .then(YukicoderProblemsSchema.safeParse);

        if (!res.success) {
            console.error("Failed to fetch or parse Yukicoder problems data:", res.error);
            return [];
        }

        return res.data
            .map((problem) =>
                problem.No === null
                    ? null
                    : {
                          provider: "YUKICODER",
                          contestId: "0", // Yukicoder does not have contestId
                          problemId: problem.No.toString(),
                          title: problem.Title,
                      },
            )
            .filter((problem) => problem !== null) as APIProblem[];
    } catch (error) {
        console.error("Error fetching Yukicoder problems:", error);
        return [];
    }
}
