import { z } from "zod";
import { ProblemProvider } from "@prisma/client";
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

const AtCoderProblemSchema = z.object({
    title: z.string().nonempty(),
    problemProvider: z.literal(ProblemProvider.ATCODER),
    contestId: z.string().default(""),
    problemId: z.string().nonempty(),
});

const CodeforcesProblemSchema = z.object({
    title: z.string().nonempty(),
    problemProvider: z.literal(ProblemProvider.CODEFORCES),
    contestId: z.string().default(""),
    problemId: z.string().nonempty(),
});

const AOJProblemSchema = z.object({
    title: z.string().nonempty(),
    problemProvider: z.literal(ProblemProvider.AOJ),
    problemId: z.string().nonempty(),
});

const YukiCoderProblemSchema = z.object({
    title: z.string().nonempty(),
    problemProvider: z.literal(ProblemProvider.YUKICODER),
    problemId: z.string().nonempty(),
});

const Problem = z.union([
    AtCoderProblemSchema,
    CodeforcesProblemSchema,
    AOJProblemSchema,
    YukiCoderProblemSchema,
]);

type AtCoderProblem = z.infer<typeof AtCoderProblemSchema>;
type CodeforcesProblem = z.infer<typeof CodeforcesProblemSchema>;
type AOJProblem = z.infer<typeof AOJProblemSchema>;
type YukiCoderProblem = z.infer<typeof YukiCoderProblemSchema>;
type Problem = AtCoderProblem | CodeforcesProblem | AOJProblem | YukiCoderProblem;
type CreatedProblem = NonNullable<Prisma.PromiseReturnType<typeof prisma.problem.findFirst>>;

export type {
    AtCoderProblem,
    CodeforcesProblem,
    AOJProblem,
    YukiCoderProblem,
    Problem,
    CreatedProblem,
};
export { AtCoderProblemSchema, CodeforcesProblemSchema, AOJProblemSchema, YukiCoderProblemSchema };
