import { z } from "zod";
import { APIProblem } from "../../types/Problem";
import { title } from "process";

const MOFEProblemSchema = z.object({
    provider: z.literal("MOFE"),
    contestId: z.string(),
    problemId: z.string(),
    title: z.string(),
});

const MOFEProblemsFetcher = async function (url: string): Promise<APIProblem[]> {
    const res = await fetch(url)
        .then((res) => res.json())
        .then(MOFEProblemSchema.array().safeParse);
    if (!res.success) {
        console.error("Failed to fetch or parse MOFE problems data:", res.error);
        return [];
    }
    return res.data;
};

export default MOFEProblemsFetcher;
