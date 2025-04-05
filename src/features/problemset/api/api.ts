import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const problemSetId = parseInt(params.id);
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "認証されていません" }, { status: 401 });
    }

    const userId = session.user.id;

    const body = await request.json();


}