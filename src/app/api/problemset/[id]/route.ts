import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getProblemSetById } from "@/features/problemset/db/ProblemSet";
import { prisma } from "@/prisma";
import { PUTRequestBody, PUTResponseBody } from "@/features/problemset/types/api";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // ユーザー認証の確認
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const problemSetId = parseInt(params.id);

        // 問題リストの存在確認
        const existingProblemSet = await getProblemSetById(problemSetId);
        if (!existingProblemSet) {
            return NextResponse.json(
                { success: false, error: "Problem Set not found" },
                { status: 404 }
            );
        }

        // 権限確認（作成者のみが編集可能）
        if (existingProblemSet.author.id !== userId) {
            return NextResponse.json(
                { success: false, error: "Permission denied" },
                { status: 403 }
            );
        }

        // リクエストボディの取得
        const body: PUTRequestBody = await request.json();

        // 問題リストの更新
        const updatedProblemSet = await prisma.problemSet.update({
            where: { id: problemSetId },
            data: {
                name: body.name,
                description: body.description,
                isPublic: body.isPublic,
            }
        });

        // 現在の問題リストの問題を取得
        const currentProblems = await prisma.problemSetProblem.findMany({
            where: { problemSetId }
        });

        // 既存の問題IDを取得
        const existingProblemIds = new Set(currentProblems.map(p => p.id));
        const newProblemIds = new Set(body.problemSetProblems.map(p => p.problemId));

        // 削除する問題を特定（新しいリストに含まれない問題）
        const problemIdsToDelete = currentProblems.filter(
            p => !body.problemSetProblems.some(
                newP => newP.problemId === p.problemId.toString()
            )
        ).map(p => p.id);

        // 問題の削除
        if (problemIdsToDelete.length > 0) {
            await prisma.problemSetProblem.deleteMany({
                where: {
                    id: { in: problemIdsToDelete }
                }
            });
        }

        // 問題の追加や更新
        for (const problemData of body.problemSetProblems) {
            const existingProblem = currentProblems.find(
                p => p.problemId.toString() === problemData.problemId
            );

            if (existingProblem) {
                // 既存の問題を更新
                await prisma.problemSetProblem.update({
                    where: { id: existingProblem.id },
                    data: {
                        memo: problemData.memo,
                        hint: problemData.hint,
                        order: problemData.order
                    }
                });
            } else {
                // 新しい問題を追加
                await prisma.problemSetProblem.create({
                    data: {
                        problemSetId,
                        problemId: parseInt(problemData.problemId),
                        memo: problemData.memo,
                        hint: problemData.hint,
                        order: problemData.order
                    }
                });
            }
        }

        // 成功レスポンスを返す
        const response: PUTResponseBody = { success: true };
        return NextResponse.json(response);

    } catch (error) {
        console.error("Error updating problem set:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update problem set" },
            { status: 500 }
        );
    }
}