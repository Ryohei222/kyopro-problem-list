import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { prisma } from "@/prisma";
import { Resource } from "@prisma/client";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ resource: string }> },
): Promise<NextResponse> {
    const session: Session | null = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    if (!userId) {
        return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const resource = (await params).resource.toUpperCase() as Resource;

    if (resource !== Resource.MOFE) {
        return NextResponse.json({ error: "Provider not found" }, { status: 400 });
    }

    const problems = await prisma.problem.findMany({
        select: {
            resource: true,
            contestId: true,
            problemId: true,
            name: true,
        },
        where: {
            resource: resource,
        },
    });
    return NextResponse.json(problems);
}
