import updateProblems from "@/features/problem/db/updateProblems";
import { APIProblem } from "@/types/Problem";
import { Resource } from "@prisma/client";
import { z } from "zod";

const MOFEContestsSchema = z.object({
    slug: z.string(),
    name: z.string(),
    kind: z.enum(["normal", "private"]),
    start_at: z.string(),
    end_at: z.string(),
    id: z.number().nullable().optional(),
});

const MOFEContestsAPISchema = z.object({
    in_progress: z.array(MOFEContestsSchema),
    future: z.array(MOFEContestsSchema),
    past: z.array(MOFEContestsSchema),
});

const MOFEContestsByIdSchema = MOFEContestsSchema.extend({
    description: z.string(),
    penalty_time: z.number(),
    tasks: z
        .object({
            slug: z.string(),
            name: z.string(),
            position: z.string(),
            difficulty: z.string(),
            accepted: z.boolean(),
            points: z.number(),
        })
        .array(),
    registered: z
        .object({
            name: z.string().nullable(),
            open: z.boolean(),
        })
        .nullable(),
    editorial: z.string().nullable(),
    writtenTasks: z
        .object({
            slug: z.string(),
            id: z.number(),
            role: z.enum(["admin", "writer", "tester"]),
        })
        .array()
        .optional(),
    isAdmin: z.boolean().optional(),
    standingsMode: z.enum(["icpc", "atcoder"]).optional(),
    registrationRestriction: z.boolean().optional(),
    allowOpenRegistration: z.boolean().optional(),
    allowTeamRegistration: z.boolean().optional(),
});

const URL = "https://api.mofecoder.com/api/contests";

export async function fetchMOFEProblems(): Promise<APIProblem[]> {
    const contests = await fetch(URL)
        .then((res) => res.json())
        .then(MOFEContestsAPISchema.safeParse);
    if (!contests.success) {
        return [];
    }
    let problems = [];
    for (const contest of contests.data.past) {
        const contestId = contest.slug;
        const contestDetail = await fetch(`${URL}/${contestId}`)
            .then((res) => res.json())
            .then(MOFEContestsByIdSchema.safeParse);
        if (!contestDetail.success) {
            return [];
        }
        problems.push(
            ...contestDetail.data.tasks.map((problem) => ({
                name: problem.name,
                contestId: contestId,
                problemId: problem.slug,
                resource: Resource.MOFE,
            })),
        );
    }
    return problems;
}
