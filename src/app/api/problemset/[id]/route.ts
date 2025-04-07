import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getProblemSetById } from "@/features/problemset/db/ProblemSet";
import { prisma } from "@/prisma";
import { PUTRequestBody, PUTResponseBody } from "@/features/problemset/types/api";
import { createProblemKey } from "@/features/problemset/types/Problem";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        const problemSetId = Number((await params).id);

        if (!userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const existingProblemSet = await getProblemSetById(problemSetId);
        if (!existingProblemSet) {
            return NextResponse.json(
                { success: false, error: "Problem Set not found" },
                { status: 404 },
            );
        }

        if (existingProblemSet.author.id !== userId) {
            return NextResponse.json(
                { success: false, error: "Permission denied" },
                { status: 403 },
            );
        }

        const body: PUTRequestBody = await request.json();

        console.log("PUT request body:", body);

        const updatedProblemSet = await prisma.problemSet.update({
            where: { id: problemSetId },
            data: {
                name: body.name,
                description: body.description,
                isPublic: body.isPublic,
            },
        });

        const newProblemIds = await prisma.problem.findMany({
            where: {
                problemId: {
                    in: body.problemSetProblems.map((problem) => problem.problemId),
                },
            },
        });

        await prisma.problemSetProblem.deleteMany({
            where: {
                problemSetId: problemSetId,
            },
        });

        console.log("New problem IDs:", newProblemIds);

        const problemMap = new Map<string, number>(
            newProblemIds.map((problem) => {
                return [createProblemKey(problem), problem.id];
            }),
        );

        console.log("Problem map:", problemMap);

        const problemsToCreate = body.problemSetProblems.flatMap((problemData) => {
            const innerId = problemMap.get(
                createProblemKey({
                    provider: problemData.problemProvider,
                    ...problemData,
                }),
            );
            if (!innerId) {
                return [];
            }
            return {
                problemSetId,
                problemId: innerId,
                memo: problemData.memo,
                hint: problemData.hint,
                order: problemData.order,
            };
        });

        console.log("Problems to create:", problemsToCreate);

        await prisma.problemSetProblem.createMany({
            data: problemsToCreate,
        });

        const response: PUTResponseBody = { success: true };
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error updating problem set:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update problem set" },
            { status: 500 },
        );
    }
}
