import { NextRequest, NextResponse } from "next/server";
import { getProblems } from "@/features/problem/db/getProblems";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const problems = await getProblems();
    return NextResponse.json({ success: true, problems: problems });
}