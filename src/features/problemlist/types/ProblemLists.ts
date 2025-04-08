import { getPublicProblemLists } from "../db/getPublicProblemLists";
import { getProblemList } from "../db/getProblemList";

export type ProblemListResponse = Awaited<ReturnType<typeof getProblemList>>;
export type ProblemListRecordResponse =
    NonNullable<ProblemListResponse>["problemListRecords"][number];
export type ProblemListsResponse = Awaited<ReturnType<typeof getPublicProblemLists>>;
