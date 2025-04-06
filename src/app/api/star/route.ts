import { NextRequest, NextResponse } from "next/server";
import { createStar, deleteStar } from "@/db/Star";

import { Session } from "next-auth";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const session: Session | null = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    if (!userId) {
        return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }
    const { problemSetId } = await request.json();
    const star = await createStar(problemSetId, userId);
    return NextResponse.json(star);
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    const session: Session | null = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    if (!userId) {
        return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }
    const { problemSetId } = await request.json();
    const star = await deleteStar(problemSetId, userId);
    return NextResponse.json(star);
}
