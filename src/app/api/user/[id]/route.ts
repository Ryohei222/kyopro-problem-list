import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";

import { getUserById } from "@/features/user/db/getUser";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session: Session | null = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = (await params).id;
    if (!userId) {
        return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const user = await getUserById(userId);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
}
