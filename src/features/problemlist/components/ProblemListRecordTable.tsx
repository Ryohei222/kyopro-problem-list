"use client";

import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProblemTableRow from "./ProblemListRecord";
import { ProblemListRecordResponse } from "../types/ProblemLists";
import { createProblemKey } from "@/types/Problem";

type SortField = "order";
type SortDirection = "asc" | "desc";

export function ProblemListRecordTable({
    problemListRecords,
}: {
    problemListRecords: ProblemListRecordResponse[];
}) {
    const [sortField, setSortField] = useState<SortField>("order");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const sortedRecords = problemListRecords.sort((a, b) => {
        return sortDirection === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
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
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className="w-[100px] cursor-pointer"
                                onClick={() => handleSort("order")}
                            >
                                <div className="flex items-center">
                                    No.
                                    <SortIcon field="order" />
                                </div>
                            </TableHead>
                            <TableHead className="w-[200px]">
                                <div className="flex items-center">問題名</div>
                            </TableHead>
                            <TableHead className="w-[40%]">
                                <div className="flex items-center">メモ</div>
                            </TableHead>
                            <TableHead className="w-[40%]">
                                <div className="flex items-center">ヒント</div>
                            </TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedRecords.map((problemListRecord) => (
                            <ProblemTableRow
                                key={createProblemKey(problemListRecord.problem)}
                                problemListRecord={problemListRecord}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
