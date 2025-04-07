import { z } from "zod";
import { APIProblem } from "../types/Problem";

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

export default async function fetchCodeforcesProblems(): Promise<APIProblem[]> {
    const URL = "https://codeforces.com/api/problemset.problems";
    try {
        const res = await fetch(URL)
            .then((res) => res.json())
            .then(ApiResponseSchema.safeParse);

        if (!res.success) {
            console.error("Failed to fetch or parse Codeforces problems data:", res.error);
            return [];
        }
        return res.data.result.problems.map((problem) => ({
            provider: "CODEFORCES",
            contestId: problem.contestId.toString(),
            problemId: problem.index,
            title: problem.name,
        }));
    } catch (error) {
        console.error("Error fetching Codeforces problems:", error);
        return [];
    }
}
