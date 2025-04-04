import { ProblemSetRecord } from "@/types/ProblemSetRecord"

export type ProblemSet = {
    id: string;
    name: string;
    description: string;
    author: User;
    problemset_records: ProblemSetRecord[];
}