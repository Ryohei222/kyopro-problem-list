import { AojProblem } from "@/features/onlinejudge/aoj/Problem";
import { createProblemList } from "@/features/problemlist/db/createProblemList";
import { updateProblemList } from "@/features/problemlist/db/updateProblemList";
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

	for (let i = 0; i < 50; i++) {
		const problemList = await createProblemList({
			name: `test-problemlist-${i}`,
			description: `test-problemlist-${i}の説明`,
			isPublic: true,
		});
		const testProblem = new AojProblem({
			name: "QQ",
			id: "0000",
			maxScore: 0,
		});
		await updateProblemList({
			id: problemList.id,
			name: `test-problemlist-${i}`,
			description: `test-problemlist-${i}の説明`,
			isPublic: true,
			problemListRecords: [
				{
					problemKey: testProblem.ProblemKey(),
					memo: "",
					hint: "",
					order: 0,
				},
			],
		});
	}

	return NextResponse.json({
		success: true,
	});
}
