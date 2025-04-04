import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json(
            { error: "検索キーワードは必須です" },
            { status: 400 }
        );
    }

    try {
        // 問題名、問題ID、コンテストIDを検索
        const problems = await prisma.problem.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { problemId: { contains: query, mode: "insensitive" } },
                    { contestId: { contains: query, mode: "insensitive" } }
                ]
            },
            orderBy: [{ difficulty: "asc" }],
            take: 50 // 検索結果は最大50件まで
        });

        return NextResponse.json(problems);
    } catch (error) {
        console.error("問題検索エラー:", error);
        return NextResponse.json(
            { error: "問題の検索中にエラーが発生しました" },
            { status: 500 }
        );
    }
}