import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import updateProblems from "@/features/problem/db/updateProblems";
import { fetchMOFEProblems } from "@/features/problem/utils/fetchMOFEProblems";

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

    const problems = await fetchMOFEProblems();
    const result = await updateProblems(problems);

    return NextResponse.json({ success: true, response: result });
}
