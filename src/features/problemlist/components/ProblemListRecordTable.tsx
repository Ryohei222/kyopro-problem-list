"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProblemTableRow from "./ProblemListRecord";
import { ProblemListRecordResponse } from "../types/ProblemLists";
import { createProblemKey, ProblemKey } from "@/types/Problem";
import {
    useAtcoderSubmissions,
    useAojSubmissions,
    useYukicoderSubmissions,
    useCodeforcesSubmissions,
} from "@/hooks/useSubmissions";

type SortField = "order" | "resource";
type SortDirection = "asc" | "desc";

export function ProblemListRecordTable({
    problemListRecords,
}: {
    problemListRecords: ProblemListRecordResponse[];
}) {
    const [sortField, setSortField] = useState<SortField>("order");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const [userIds, setUserIds] = useState({
        atcoder: "",
        aoj: "",
        yukicoder: "",
        codeforces: "",
    });
    const [acProblems, setAcProblems] = useState<Set<ProblemKey>>(new Set());
    const { submissions: aojSubmissions, trigger: aojTrigger } = useAojSubmissions(userIds.aoj);

    const { submissions: atcoderSubmissions, trigger: atcoderTrigger } = useAtcoderSubmissions(
        userIds.atcoder,
    );
    const { submissions: codeforcesSubmissions, trigger: codeforcesTrigger } =
        useCodeforcesSubmissions(userIds.codeforces);
    const { submissions: yukicoderSubmissions, trigger: yukicoderTrigger } =
        useYukicoderSubmissions(userIds.yukicoder);

    const handleFetchSubmissions = async () => {
        aojTrigger(userIds.aoj);
        atcoderTrigger(userIds.atcoder);
        codeforcesTrigger(userIds.codeforces);
        yukicoderTrigger(userIds.yukicoder);
    };

    useEffect(() => {
        const submissions = [
            aojSubmissions || [],
            atcoderSubmissions || [],
            codeforcesSubmissions || [],
            yukicoderSubmissions || [],
        ].flat();
        const acSet = new Set<ProblemKey>(
            submissions.map((submission) => createProblemKey(submission)),
        );
        setAcProblems(acSet);
        console.log("AC Problems:", acSet);
    }, [atcoderSubmissions, aojSubmissions, yukicoderSubmissions, codeforcesSubmissions]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const sortedRecords = [...problemListRecords].sort((a, b) => {
        if (sortField === "resource") {
            const resourceA = a.problem.resource.toLowerCase();
            const resourceB = b.problem.resource.toLowerCase();
            return sortDirection === "asc"
                ? resourceA.localeCompare(resourceB)
                : resourceB.localeCompare(resourceA);
        } else {
            return sortDirection === "asc"
                ? a[sortField] - b[sortField]
                : b[sortField] - a[sortField];
        }
    });

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? (
            <ChevronUp className="h-4 w-4 ml-1" />
        ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
        );
    };

    return (
        <div className="space-y-4">
            <div className="mb-4 flex flex-wrap gap-4">
                <div className="flex flex-col">
                    <label htmlFor="aoj-id" className="text-sm font-medium text-gray-700 mb-1">
                        AOJ ID
                    </label>
                    <input
                        id="aoj-id"
                        type="text"
                        placeholder="Enter AOJ ID"
                        value={userIds.aoj}
                        onChange={(e) => setUserIds({ ...userIds, aoj: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="atcoder-id" className="text-sm font-medium text-gray-700 mb-1">
                        AtCoder ID
                    </label>
                    <input
                        id="atcoder-id"
                        type="text"
                        placeholder="Enter AtCoder ID"
                        value={userIds.atcoder}
                        onChange={(e) => setUserIds({ ...userIds, atcoder: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="codeforces-id"
                        className="text-sm font-medium text-gray-700 mb-1"
                    >
                        Codeforces ID
                    </label>
                    <input
                        id="codeforces-id"
                        type="text"
                        placeholder="Enter Codeforces ID"
                        value={userIds.codeforces}
                        onChange={(e) => setUserIds({ ...userIds, codeforces: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="yukicoder-id"
                        className="text-sm font-medium text-gray-700 mb-1"
                    >
                        yukicoder ID
                    </label>
                    <input
                        id="yukicoder-id"
                        type="text"
                        placeholder="Enter yukicoder ID"
                        value={userIds.yukicoder}
                        onChange={(e) => setUserIds({ ...userIds, yukicoder: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    onClick={handleFetchSubmissions}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                    Fetch Submissions
                </button>
            </div>
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className="w-[80px] cursor-pointer"
                                onClick={() => handleSort("order")}
                            >
                                <div className="flex items-center">
                                    No.
                                    <SortIcon field="order" />
                                </div>
                            </TableHead>
                            <TableHead
                                className="w-[120px] cursor-pointer"
                                onClick={() => handleSort("resource")}
                            >
                                <div className="flex items-center">
                                    サイト
                                    <SortIcon field="resource" />
                                </div>
                            </TableHead>
                            <TableHead className="w-[200px]">
                                <div className="flex items-center">問題名</div>
                            </TableHead>
                            <TableHead className="w-[30%]">
                                <div className="flex items-center">メモ</div>
                            </TableHead>
                            <TableHead className="w-[30%]">
                                <div className="flex items-center">ヒント</div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedRecords.map((problemListRecord) => (
                            <ProblemTableRow
                                key={createProblemKey(problemListRecord.problem)}
                                problemListRecord={problemListRecord}
                                className={
                                    acProblems.has(createProblemKey(problemListRecord.problem))
                                        ? "bg-green-500"
                                        : ""
                                }
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
