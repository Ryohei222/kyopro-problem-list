import { prisma } from "@/prisma";

import { ProblemSet, ProblemSetProblem } from "@prisma/client";

export default async function updateProblemSet(problemSet: ProblemSet, problemSetProblems: ProblemSetProblem[]) {
    try {
        const updatedProblemSet = await prisma.problemSet.update({
            where: { id: problemSet.id },
            data: {
                name: problemSet.name,
                description: problemSet.description,
                isPublic: problemSet.isPublic,
            },
        });

        const oldProblemSetProblems = await prisma.problemSetProblem.findMany({
            where: { problemSetId: problemSet.id },

        });


        // 削除するべき問題 の ID を取得する
        const oldProblemIds = new Set(oldProblemSetProblems.map(p => p.id));
        const newProblemIds = new Set(problemSetProblems.map(p => p.id));

        // 削除する問題は新しい問題セットに含まれない問題
        const problemIdsToDelete = [...(oldProblemIds.difference(newProblemIds))];

        await prisma.problemSetProblem.deleteMany({
            where: {
                id: { in: problemIdsToDelete },
            },
        });

        const oldProblemsSet = new Set(oldProblemSetProblems);
        const newProblemsSet = new Set(problemSetProblems);

        // upsert する問題は古い問題セットに要素として含まれない問題
        const problemsToUpsert = [...(newProblemsSet.difference(oldProblemsSet))];

        await Promise.all(problemsToUpsert.map(problem =>
            prisma.problemSetProblem.upsert({
                where: { id: problem.id },
                update: {
                    problemSetId: problemSet.id,
                    problemId: problem.problemId,
                    memo: problem.memo,
                    hint: problem.hint,
                    order: problem.order
                },
                create: {
                    problemSetId: problemSet.id, problemId: problem.id, memo: problem.memo, hint: problem.hint, order: problem.order
                }
            })
        ));

        return updatedProblemSet;
    } catch (error) {
        console.error("Error updating Problem Set:", error);
        throw new Error("Failed to update Problem Set");
    }
}