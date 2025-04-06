import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createProblemSet } from "@/features/problemset/db/ProblemSet";

export async function POST(request: NextRequest) {
    const { name, description, isPublic } = await request.json();
    const session = await auth();
    console.log("session", session);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    if (!userId) {
        return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }
    const newProblemSet = await createProblemSet(name, userId, description, isPublic);
    return NextResponse.json(newProblemSet);
}
