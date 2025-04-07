import { z } from "zod";
import { APIProblem } from "../types/Problem";

const AtCoderProblemSchema = z.object({
    id: z.string(),
    contest_id: z.string(),
    problem_index: z.string(),
    name: z.string(),
    title: z.string(),
});

const AtCoderProblemsSchema = z.array(AtCoderProblemSchema);

export default async function fetchAtCoderProblems(): Promise<APIProblem[]> {
    const URL = "https://kenkoooo.com/atcoder/resources/problems.json";
    try {
        const res = await fetch(URL)
            .then((res) => res.json())
            .then(AtCoderProblemsSchema.safeParse);

        if (!res.success) {
            console.error("Failed to fetch or parse AtCoder problems data:", res.error);
            return [];
        }

        return res.data.map((problem) => ({
            provider: "ATCODER",
            contestId: problem.contest_id,
            problemId: problem.problem_index,
            title: problem.title,
        }));
    } catch (error) {
        console.error("Error fetching AtCoder problems:", error);
        return [];
    }
}
