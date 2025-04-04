import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";

import { getUserStars } from "@/controller/Star";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const session: Session | null = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    if (!userId) {
        return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }
    const stars = await getUserStars(userId);
    return NextResponse.json(stars);
}
