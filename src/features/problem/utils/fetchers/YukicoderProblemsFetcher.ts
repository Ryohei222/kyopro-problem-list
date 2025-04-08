import { z } from "zod";
import { APIProblem } from "@/types/Problem";

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

const YukicoderProblemsFetcher = async function (url: string): Promise<APIProblem[]> {
    const res = await fetch(url)
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
                      resource: "YUKICODER",
                      contestId: "0",
                      problemId: problem.No.toString(),
                      name: problem.Title,
                  },
        )
        .filter((problem) => problem !== null) as APIProblem[];
};

export default YukicoderProblemsFetcher;
