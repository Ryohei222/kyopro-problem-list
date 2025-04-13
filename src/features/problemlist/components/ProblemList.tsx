"use client";

import { TableHeader, TableRow, TableHead, TableBody, Table } from "@/components/ui/table";
import { createProblemKey } from "@/types/Problem";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ProblemListRecordResponse } from "../types/ProblemLists";
import ProblemListItem from "./ProblemListItem";

type ProblemListRecordWithSolvedFlag = ProblemListRecordResponse & {
    isSolved: boolean;
};

export type ProblemListProps = {
    problemListRecords: ProblemListRecordWithSolvedFlag[];
};

type SortField = "order" | "resource";
type SortDirection = "asc" | "desc";

export function ProblemList(props: ProblemListProps) {
    const [sortField, setSortField] = useState<SortField>("order");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? (
            <ChevronUp className="h-4 w-4 ml-1" />
        ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
        );
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const sortedRecords = [...props.problemListRecords].sort((a, b) => {
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

    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className="w-[5%] cursor-pointer"
                            onClick={() => handleSort("order")}
                        >
                            <div className="flex items-center">
                                No.
                                <SortIcon field="order" />
                            </div>
                        </TableHead>
                        <TableHead
                            className="w-[5%] cursor-pointer"
                            onClick={() => handleSort("resource")}
                        >
                            <div className="flex items-center">
                                サイト
                                <SortIcon field="resource" />
                            </div>
                        </TableHead>
                        <TableHead className="w-[20%]">
                            <div className="flex items-center">問題名</div>
                        </TableHead>
                        <TableHead className="w-[10%]">
                            <div className="flex items-center">Difficulty</div>
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
                        <ProblemListItem
                            key={createProblemKey(problemListRecord.problem)}
                            problemListRecord={problemListRecord}
                            showDifficulty={true}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
