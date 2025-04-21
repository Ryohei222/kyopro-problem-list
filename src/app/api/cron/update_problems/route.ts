import { OnlineJudges } from "@/types/OnlineJudges";
import { Resource } from "@prisma/client";
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

	for (const oj of Object.values(OnlineJudges)) {
		const problems = await oj.fetchProblems();
		await oj.updateProblems(problems);
	}

	// const problems: CreatedProblem[] = [];

	// for (const resource of Object.values(Resource)) {
	// 	if (resource === Resource.MOFE) {
	// 		continue;
	// 	}
	// 	const fetchedProblems = await getProblems(resource);
	// 	const insertedProblems = await updateProblems(fetchedProblems);
	// 	problems.push(...insertedProblems);
	// }

	// const fetchedMOFEProblems = await getMofeProblems();
	// const result = await updateProblems(fetchedMOFEProblems);

	return NextResponse.json({
		success: true,
		createdProblems: [...problems, ...result],
	});
}
