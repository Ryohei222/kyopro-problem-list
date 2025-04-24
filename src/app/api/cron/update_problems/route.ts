import { OnlineJudgeProblemUpdaters } from "@/features/onlinejudge/OnlineJudges";
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

	let updated = 0;
	let created = 0;

	for (const oj of Object.values(OnlineJudgeProblemUpdaters)) {
		const result = await oj.fetchAndUpdateProblems();
		updated += result.updatedProblems;
		created += result.newProblems;
	}

	return NextResponse.json({
		success: true,
		results: {
			newProblems: created,
			updatedProblems: updated,
		},
	});
}
