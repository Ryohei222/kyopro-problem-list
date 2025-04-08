import { Resource } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import updateProblems from "@/features/problem/db/updateProblems";
import fetchProblems from "@/features/problem/utils/fetchProblems";
import { CreatedProblem } from "@/types/Problem";
import { fetchMOFEProblems } from "@/features/problem/utils/fetchMOFEProblems";

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

    let problems: CreatedProblem[] = [];

    for (const resource of Object.values(Resource)) {
        if (resource === Resource.MOFE) {
            continue;
        }
        const fetchedProblems = await fetchProblems(resource);
        const insertedProblems = await updateProblems(fetchedProblems);
        problems.push(...insertedProblems);
    }

    const fetchedMOFEProblems = await fetchMOFEProblems();
    const result = await updateProblems(fetchedMOFEProblems);

    return NextResponse.json({ success: true, createdProblems: [...problems, ...result] });
}
