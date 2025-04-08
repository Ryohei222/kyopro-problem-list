import { z } from "zod";
import { APIProblem } from "@/types/Problem";

const AtCoderProblemSchema = z.object({
    id: z.string(),
    contest_id: z.string(),
    problem_index: z.string(),
    name: z.string(),
    title: z.string(),
});

const AtCoderProblemsSchema = z.array(AtCoderProblemSchema);

const AtCoderProblemsFetcher = async function (url: string): Promise<APIProblem[]> {
    const res = await fetch(url)
        .then((res) => res.json())
        .then(AtCoderProblemsSchema.safeParse);
    if (!res.success) {
        console.error("Failed to fetch or parse AtCoder problems data:", res.error);
        return [];
    }
    return res.data.map(
        (problem) =>
            ({
                resource: "ATCODER",
                contestId: problem.contest_id,
                problemId: problem.id,
                name: problem.title,
            }) as APIProblem,
    );
};

export default AtCoderProblemsFetcher;
