"use client";

import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { CommonProblem } from "@/types/CommonProblem";
import { hasDifficulty } from "@/utils/hasDifficulty";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ProblemListItem from "./ProblemListItem";

type ProblemListRecord = {
	problem: CommonProblem;
	memo: string;
	hint: string;
	order: number;
};

export type ProblemListRecordWithSolvedFlag = {
	isSolved: boolean;
} & ProblemListRecord;

export type ProblemListProps = {
	problemListRecords: ProblemListRecordWithSolvedFlag[];
};

type SortField = "order" | "resource" | "difficulty";
type SortDirection = "asc" | "desc";

export function ProblemList(props: ProblemListProps) {
	const [sortField, setSortField] = useState<SortField>("order");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
	const [showDifficulty, setShowDifficulty] = useState(false);
	const [showSolved, setShowSolved] = useState(true);

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
		}
		if (sortField === "difficulty") {
			const difficultyA = hasDifficulty(a.problem)
				? a.problem.Difficulty() || 0
				: 0;
			const difficultyB = hasDifficulty(b.problem)
				? b.problem.Difficulty() || 0
				: 0;
			return sortDirection === "asc"
				? difficultyA - difficultyB
				: difficultyB - difficultyA;
		}
		return sortDirection === "asc"
			? a[sortField] - b[sortField]
			: b[sortField] - a[sortField];
	});

	const filteredRecords = showSolved
		? sortedRecords
		: sortedRecords.filter((record) => !record.isSolved);

	return (
		<div className="rounded-md border bg-white">
			<div className="flex items-center gap-4 p-2">
				<label
					className="flex items-center gap-2 text-sm"
					htmlFor="show-difficulty-switch"
				>
					<Switch
						checked={showDifficulty}
						onCheckedChange={() => setShowDifficulty((v) => !v)}
						id="show-difficulty-switch"
					/>
					<span>難易度(Difficulty)を表示</span>
				</label>
				<label
					className="flex items-center gap-2 text-sm"
					htmlFor="show-solved-switch"
				>
					<Switch
						checked={showSolved}
						onCheckedChange={() => setShowSolved((v) => !v)}
						id="show-solved-switch"
					/>
					<span>解いた問題を表示</span>
				</label>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="w-20 cursor-pointer"
							onClick={() => handleSort("order")}
						>
							<div className="flex items-center">
								No.
								<SortIcon field="order" />
							</div>
						</TableHead>
						<TableHead
							className="w-28 cursor-pointer"
							onClick={() => handleSort("resource")}
						>
							<div className="flex justify-start">
								サイト
								<SortIcon field="resource" />
							</div>
						</TableHead>
						<TableHead className="w-96">
							<div className="flex items-center">問題名</div>
						</TableHead>
						{showDifficulty && (
							<TableHead
								className="w-28 cursor-pointer"
								onClick={() => handleSort("difficulty")}
							>
								<div className="flex items-center">
									Difficulty
									<SortIcon field="difficulty" />
								</div>
							</TableHead>
						)}
						<TableHead className="w-xl">
							<div className="flex items-center">メモ</div>
						</TableHead>
						<TableHead className="w-xl">
							<div className="flex items-center">ヒント</div>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredRecords.map((problemListRecord) => (
						<ProblemListItem
							key={problemListRecord.problem.ProblemKey()}
							problemListRecord={problemListRecord}
							showDifficulty={showDifficulty}
						/>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
