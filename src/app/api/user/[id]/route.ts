import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { getUserById } from "@/features/user/db/getUser";
import { prisma } from "@/prisma";
import { z } from "zod";

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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session: Session | null = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (await params).id;
    if (!userId) {
        return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    if (session.user.id !== userId) {
        return NextResponse.json(
            { error: "Cannot update another user's profile" },
            { status: 403 },
        );
    }

    let body;
    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const updateSchema = z.object({
        name: z.string().min(2).max(50).optional(),
        bio: z.string().max(500).nullable().optional(),
        AtCoderId: z.string().max(50).nullable().optional(),
        CodeforcesId: z.string().max(50).nullable().optional(),
        XId: z.string().max(15).nullable().optional(),
        GitHubId: z.string().max(39).nullable().optional(),
        image: z.string().nullable().optional(),
    });

    const validationResult = updateSchema.safeParse(body);
    if (!validationResult.success) {
        return NextResponse.json(
            { error: "Validation failed", details: validationResult.error.format() },
            { status: 400 },
        );
    }

    const updateData = validationResult.data;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: updateData.name,
                AtCoderId: updateData.AtCoderId,
                AOJId: updateData.AOJId,
                CodeforcesId: updateData.CodeforcesId,

                XId: updateData.XId,
                GitHubId: updateData.GitHubId,
                image: updateData.image,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}
