import { readMofeProblemsAsPlainObjects } from "@/features/onlinejudge/mofe/db/readProblemsAsPlainObjects";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
	const problems = await readMofeProblemsAsPlainObjects;

	return NextResponse.json({
		success: true,
		results: {
			problems: problems,
		},
	});
}
