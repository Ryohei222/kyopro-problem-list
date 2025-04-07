import { ProblemProvider } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import updateProblems from "@/features/problem/db/updateProblems";
import fetchProblems from "@/features/problem/utils/fetchProblems";
import { CreatedProblem } from "@/features/problem/types/Problem";

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

    for (const provider of Object.values(ProblemProvider)) {
        const fetchedProblems = await fetchProblems(provider);
        const insertedProblems = await updateProblems(fetchedProblems);
        problems.push(...insertedProblems);
    }

    return NextResponse.json({ success: true, createdProblems: problems });
}
