import { z } from "zod";

const MofeContestSchema = z.object({
	slug: z.string(),
	name: z.string(),
	kind: z.enum(["normal", "private"]),
	start_at: z.string(),
	end_at: z.string(),
	id: z.number().nullable().optional(),
});

export const MofeContestsApiSchema = z.object({
	in_progress: z.array(MofeContestSchema),
	future: z.array(MofeContestSchema),
	past: z.array(MofeContestSchema),
});

export const MofeContestApiSchema = MofeContestSchema.extend({
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
