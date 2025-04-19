import { Resource } from "@prisma/client";
import type { CommonProblem } from "../interfaces/CommonProblem";
import { fetchApi } from "../utils/fetchApi";
import { MOFE_API_URL } from "./constant";

import { z } from "zod";

const MofeContestSchema = z.object({
	slug: z.string(),
	name: z.string(),
	kind: z.enum(["normal", "private"]),
	start_at: z.string(),
	end_at: z.string(),
	id: z.number().nullable().optional(),
});

const MofeContestsApiSchema = z.object({
	in_progress: z.array(MofeContestSchema),
	future: z.array(MofeContestSchema),
	past: z.array(MofeContestSchema),
});

const MofeContestApiSchema = MofeContestSchema.extend({
	description: z.string(),
	penalty_time: z.number(),
	tasks: z
		.object({
			slug: z.string(),
			name: z.string(),
			position: z.string(),
			difficulty: z.string(),
			accepted: z.boolean(),
			points: z.number(),
		})
		.array(),
	registered: z
		.object({
			name: z.string().nullable(),
			open: z.boolean(),
		})
		.nullable(),
	editorial: z.string().nullable(),
	writtenTasks: z
		.object({
			slug: z.string(),
			id: z.number(),
			role: z.enum(["admin", "writer", "tester"]),
		})
		.array()
		.optional(),
	isAdmin: z.boolean().optional(),
	standingsMode: z.enum(["icpc", "atcoder"]).optional(),
	registrationRestriction: z.boolean().optional(),
	allowOpenRegistration: z.boolean().optional(),
	allowTeamRegistration: z.boolean().optional(),
});

async function fetchMofePastContests() {
	const contests = await fetchApi(
		`${MOFE_API_URL}/contests`,
		MofeContestsApiSchema,
	);
	return contests.past;
}

export async function fetchMofeProblems(): Promise<CommonProblem[]> {
	const contests = await fetchMofePastContests();
	const problems = [];
	for (const contest of contests) {
		const contestDetail = await fetchApi(
			`${MOFE_API_URL}/contests/${contest.slug}`,
			MofeContestApiSchema,
		);
		problems.push(
			...contestDetail.tasks
				.filter((problem) => !!problem)
				.map((problem) => ({
					name: problem.name,
					contestId: contest.slug,
					problemId: problem.slug,
					resource: Resource.MOFE,
					contestName: contest.name,
					difficulty: null,
				}))
				.filter((problem) => problem.problemId !== ""),
		);
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
	return problems;
}
