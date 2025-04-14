import type { getProblemList } from "../db/getProblemList";
import type { getPublicProblemLists } from "../db/getPublicProblemLists";

export type ProblemListResponse = Awaited<ReturnType<typeof getProblemList>>;
export type ProblemListRecordResponse =
	NonNullable<ProblemListResponse>["problemListRecords"][number];
export type ProblemListsResponse = Awaited<
	ReturnType<typeof getPublicProblemLists>
>;
