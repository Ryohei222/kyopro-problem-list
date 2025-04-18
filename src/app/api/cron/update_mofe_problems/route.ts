import updateProblems from "@/db/updateProblems";
import { getMofeProblems } from "@/features/externalapi/mofe/getMofeProblems";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

	const problems = await getMofeProblems();
	const result = await updateProblems(problems);

	return NextResponse.json({ success: true, response: result });
}
