import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const contestId = searchParams.get("contestId");
    const problemId = searchParams.get("problemId");

    if (!contestId || !problemId) {
        return NextResponse.json(
            { error: "コンテストIDと問題IDは必須です" },
            { status: 400 }
        );
    }

    try {
        // 問題を検索
        const problem = await prisma.problem.findFirst({
            where: {
                contestId: contestId,
                problemId: problemId
            }
        });

        if (!problem) {
            return NextResponse.json(
                { error: "指定された問題が見つかりません" },
                { status: 404 }
            );
        }

        return NextResponse.json(problem);
    } catch (error) {
        console.error("問題取得エラー:", error);
        return NextResponse.json(
            { error: "問題の取得中にエラーが発生しました" },
            { status: 500 }
        );
    }
}