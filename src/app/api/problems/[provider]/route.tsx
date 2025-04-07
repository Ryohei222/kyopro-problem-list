import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { prisma } from "@/prisma";
import { ProblemProvider } from "@prisma/client";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ provider: string }> },
): Promise<NextResponse> {
    const session: Session | null = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    if (!userId) {
        return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const provider = (await params).provider.toUpperCase() as ProblemProvider;

    if (provider !== ProblemProvider.MOFE) {
        return NextResponse.json({ error: "Provider not found" }, { status: 400 });
    }

    const problems = await prisma.problem.findMany({
        select: {
            provider: true,
            contestId: true,
            problemId: true,
            title: true,
        },
        where: {
            provider: provider,
        },
    });
    return NextResponse.json(problems);
}
