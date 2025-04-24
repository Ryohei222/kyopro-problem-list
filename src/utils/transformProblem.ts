import { AojProblem } from "@/features/onlinejudge/aoj/Problem";
import { AtcoderProblem } from "@/features/onlinejudge/atcoder/Problem";
import { CodeforcesProblem } from "@/features/onlinejudge/codeforces/Problem";
import { MofeProblem } from "@/features/onlinejudge/mofe/Problem";
import { YukicoderProblem } from "@/features/onlinejudge/yukicoder/Problem";
import { prisma } from "@/prisma";
import type { CommonProblem } from "@/types/CommonProblem";

async function getProblem() {
	return prisma.problemListRecord.findFirst({
		select: {
			problem: {
				select: {
					id: true,
					AojProblem: {},
					AtcoderProblem: {},
					CodeforcesProblem: {},
					MofeProblem: {},
					YukicoderProblem: {},
				},
			},
		},
	});
}

type PropsType = NonNullable<Awaited<ReturnType<typeof getProblem>>>["problem"];

export function transformProblem(problem: PropsType): CommonProblem {
	if (problem.AojProblem) {
		return new AojProblem(problem.AojProblem);
	}
	if (problem.AtcoderProblem) {
		return new AtcoderProblem({
			...problem.AtcoderProblem,
			difficulty: problem.AtcoderProblem.difficulty ?? undefined,
		});
	}
	if (problem.CodeforcesProblem) {
		return new CodeforcesProblem({
			...problem.CodeforcesProblem,
			rating: problem.CodeforcesProblem.rating ?? undefined,
			points: problem.CodeforcesProblem.points ?? undefined,
		});
	}
	if (problem.MofeProblem) {
		return new MofeProblem(problem.MofeProblem);
	}
	if (problem.YukicoderProblem) {
		return new YukicoderProblem(problem.YukicoderProblem);
	}
	throw new Error("Unknown problem type");
}
