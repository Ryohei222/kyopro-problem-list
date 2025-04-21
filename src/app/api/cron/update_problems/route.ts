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

	const results = await Promise.all(
		Object.values(OnlineJudgeProblemUpdaters).map((oj) =>
			oj.fetchAndUpdateProblems(),
		),
	);

	return NextResponse.json({
		success: true,
		results: results.map((result) => ({
			newProblems: result.newProblems,
			updatedProblems: result.updatedProblems,
		})),
	});
}
