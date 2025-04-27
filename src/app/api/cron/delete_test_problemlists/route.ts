import { prisma } from "@/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const maxDuration = 60; // seconds

export async function GET(req: NextRequest): Promise<NextResponse> {
	const authHeader = req.headers.get("authorization");
	if (
		authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
		process.env.NODE_ENV !== "development"
	) {
		return new NextResponse("Unauthorized", {
			status: 401,
		});
	}

	await prisma.$transaction(async () => {
		const problemLists = await prisma.problemList.findMany({});
		const testProblemListIds = [];
		for (const problemList of problemLists) {
			if (problemList.name.startsWith("test-problemlist")) {
				testProblemListIds.push(problemList.id);
			}
		}
		console.log("testProblemListIds", testProblemListIds);
		await prisma.star.deleteMany({
			where: {
				problemListId: {
					in: testProblemListIds,
				},
			},
		});
		await prisma.problemListRecord.deleteMany({
			where: {
				problemListId: {
					in: testProblemListIds,
				},
			},
		});
		await prisma.problemList.deleteMany({
			where: {
				id: {
					in: testProblemListIds,
				},
			},
		});
	});

	return NextResponse.json({
		success: true,
	});
}
