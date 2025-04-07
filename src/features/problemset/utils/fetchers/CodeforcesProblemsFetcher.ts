import { z } from "zod";
import { APIProblem } from "../../types/Problem";

const CodeforcesProblemSchema = z.object({
    contestId: z.number(),
    index: z.string(),
    name: z.string(),
    type: z.string(),
    points: z.number().optional(),
    rating: z.number().optional(),
    tags: z.array(z.string()),
});

const ProblemStatisticSchema = z.object({
    contestId: z.number(),
    index: z.string(),
    solvedCount: z.number(),
});

const ApiResponseSchema = z.object({
    status: z.string(),
    result: z.object({
        problems: z.array(CodeforcesProblemSchema),
        problemStatistics: z.array(ProblemStatisticSchema),
    }),
});

const CodeforcesProblemsFetcher = async function (url: string): Promise<APIProblem[]> {
    const res = await fetch(url)
        .then((res) => res.json())
        .then(ApiResponseSchema.safeParse);
    if (!res.success) {
        console.error("Failed to fetch or parse Codeforces problems data:", res.error);
        return [];
    }
    return res.data.result.problems.map(
        (problem) =>
            ({
                provider: "CODEFORCES",
                contestId: problem.contestId.toString(),
                problemId: problem.index,
                title: problem.name,
            }) as APIProblem,
    );
};

export default CodeforcesProblemsFetcher;
