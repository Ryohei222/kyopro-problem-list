import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import updateProblems from "@/features/problem/db/updateProblems";
import { getMofeProblems } from "@/features/externalapi/mofe/getMofeProblems";

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

    const problems = await getMofeProblems();
    const result = await updateProblems(problems);

    return NextResponse.json({ success: true, response: result });
}
