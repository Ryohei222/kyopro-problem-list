import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { getProblemSetById } from "@/features/problemset/db/ProblemSet";

const prisma = new PrismaClient();
1
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const problemSetId = parseInt(params.id);

    const problemSet = await getProblemSetById(problemSetId);
    if (!problemSet) {
        return NextResponse.json({ error: "問題セットが見つかりません" }, { status: 404 });
    }

    return NextResponse.json(problemSet);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const problemSetId = parseInt(params.id);
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "認証されていません" }, { status: 401 });
    }

    const userId = session.user.id;

    const body = await request.json();
    const { name, description, isPublic } = body;

}