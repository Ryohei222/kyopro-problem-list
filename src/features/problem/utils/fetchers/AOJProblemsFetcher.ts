import { z } from "zod";
import { APIProblem } from "../../types/Problem";

const AOJProblemSchema = z.object({
    id: z.string(),
    available: z.number(),
    doctype: z.number(),
    name: z.string(),
    problemTimeLimit: z.number(),
    problemMemoryLimit: z.number(),
    maxScore: z.number(),
    solvedUser: z.number(),
    submissions: z.number(),
    recommendations: z.number(),
    isSolved: z.boolean(),
    bookmark: z.boolean(),
    recommend: z.boolean(),
    successRate: z.number(),
    score: z.number(),
    userScore: z.number(),
});

const AOJProblemsSchema = z.array(AOJProblemSchema);

const AOJProblemsFetcher = async function (url: string): Promise<APIProblem[]> {
    const res = await fetch(url)
        .then((res) => res.json())
        .then(AOJProblemsSchema.safeParse);
    if (!res.success) {
        console.error("Failed to fetch or parse AOJ problems data:", res.error);
        return [];
    }
    return res.data.map(
        (problem) =>
            ({
                provider: "AOJ",
                contestId: "0",
                problemId: problem.id,
                title: problem.name,
            }) as APIProblem,
    );
};

export default AOJProblemsFetcher;
