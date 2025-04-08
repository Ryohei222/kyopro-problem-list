import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import updateProblems from "@/features/problem/db/updateProblems";

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

export async function GET(req: NextRequest): Promise<NextResponse> {
    const authHeader = req.headers.get("authorization");
    if (
        authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
        process.env.NODE_ENV !== "development"
    ) {
        return new NextResponse("Unauthorized", {
            status: 401,
        });
    }

    const contests = await fetch(URL)
        .then((res) => res.json())
        .then(MOFEContestsAPISchema.safeParse);
    if (!contests.success) {
        console.error("Failed to fetch or parse MOFE contests data:", contests.error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch contests" },
            { status: 500 },
        );
    }

    for (const contest of contests.data.past) {
        const contestId = contest.slug;
        console.log(`${URL}/${contestId}`);
        const contestDetail = await fetch(`${URL}/${contestId}`)
            .then((res) => res.json())
            .then(MOFEContestsByIdSchema.safeParse);
        if (!contestDetail.success) {
            console.error(
                `Failed to fetch or parse MOFE problems for contest ${contestId}:`,
                contestDetail.error,
            );
            return NextResponse.json(
                { success: false, error: `Failed to fetch problems for contest ${contestId}` },
                { status: 500 },
            );
        }
        const problems = contestDetail.data.tasks;

        const createdProblems = await updateProblems(
            problems.map((problem) => ({
                resource: "MOFE",
                contestId: contest.slug,
                problemId: problem.slug,
                name: problem.name,
            })),
        );

        console.log("Created problems:", createdProblems);

        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ success: true, response: contests.data });
}
