import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const problemSetId = parseInt(params.id);

    // リクエストボディを取得
    const { name, description, isPublic, problems } = await request.json();

    // ユーザー認証
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const userId = session.user.id;

    // 問題セットが存在するか、かつ現在のユーザーが作成者かチェック
    const problemSet = await prisma.problemSet.findUnique({
        where: { id: problemSetId },
        include: { problemSetProblems: true },
        select: { id: true, authorId: true, problemSetProblems: true }
    });

    if (!problemSet) {
        return NextResponse.json({ error: "問題セットが見つかりません" }, { status: 404 });
    }

    if (problemSet.authorId !== userId) {
        return NextResponse.json({ error: "編集権限がありません" }, { status: 403 });
    }

    try {
        // トランザクションを使用して更新処理を行う
        const result = await prisma.$transaction(async (tx) => {
            // 問題セットの基本情報を更新
            const updatedProblemSet = await tx.problemSet.update({
                where: { id: problemSetId },
                data: {
                    name,
                    description,
                    isPublic,
                }
            });

            // 既存の問題のIDを取得
            const existingProblems = problemSet.problemSetProblems;

            // 問題セットの問題を全て削除
            await tx.problemSetProblem.deleteMany({
                where: { problemSetId }
            });

            // 問題を追加（指定された順序で）
            if (problems && problems.length > 0) {
                // 問題を一括で追加
                await tx.problemSetProblem.createMany({
                    data: problems.map((problem, index) => ({
                        problemSetId,
                        contestId: problem.contestId,
                        problemId: problem.problemId,
                        order: problem.order !== undefined ? problem.order : index
                    }))
                });
            }

            // 更新後の問題セットを取得（問題も含めて）
            return await tx.problemSet.findUnique({
                where: { id: problemSetId },
                include: {
                    problemSetProblems: {
                        include: {
                            problem: true
                        },
                        orderBy: { order: 'asc' }
                    },
                    author: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    }
                }
            });
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("問題セット更新エラー:", error);
        return NextResponse.json({ error: "問題セットの更新中にエラーが発生しました" }, { status: 500 });
    }
}