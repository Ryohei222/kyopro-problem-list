"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import type { ProblemListsResponse } from "../types/ProblemLists";
import { Pagenation } from "./Pagenation";
import { ProblemListCard } from "./ProblemListCard";

type SortField = "name" | "author" | "stars" | "createdAt";
type SortDirection = "asc" | "desc";

export function ProblemListsCards({
	problemLists,
}: { problemLists: ProblemListsResponse }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortField, setSortField] = useState<SortField>("stars");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

	const displayPerPageOptions = [
		{ label: "20 件", value: 20 },
		{ label: "50 件", value: 50 },
		{ label: "100 件", value: 100 },
	];

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(
		displayPerPageOptions[0].value,
	);

	const filteredLists = problemLists
		.filter(
			(list) =>
				list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				list.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				list.description.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		.sort((a, b) => {
			if (sortField === "createdAt") {
				return sortDirection === "asc"
					? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					: new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			}
			if (sortField === "stars") {
				const aValue = a._count.stars;
				const bValue = b._count.stars;
				return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
			}
			if (sortField === "author") {
				const aValue = a.author.name.toLowerCase();
				const bValue = b.author.name.toLowerCase();
				return sortDirection === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}
			const aValue = a.name.toLowerCase();
			const bValue = b.name.toLowerCase();
			return sortDirection === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		});

	const sortOptions = [
		{ label: "スター数 (多い順)", field: "stars", direction: "desc" },
		{ label: "スター数 (少ない順)", field: "stars", direction: "asc" },
		{ label: "リスト名 (昇順)", field: "name", direction: "asc" },
		{ label: "リスト名 (降順)", field: "name", direction: "desc" },
		{ label: "作成者 (昇順)", field: "author", direction: "asc" },
		{ label: "作成者 (降順)", field: "author", direction: "desc" },
		{ label: "作成日 (新しい順)", field: "createdAt", direction: "desc" },
		{ label: "作成日 (古い順)", field: "createdAt", direction: "asc" },
	];

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-center">
				<div className="relative w-full sm:w-64">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
					<Input
						placeholder="問題リストを検索..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-8"
					/>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-sm text-gray-500">並び替え:</span>
					<select
						className="border rounded-md p-2 text-sm"
						value={`${sortField}-${sortDirection}`}
						onChange={(e) => {
							const [field, direction] = e.target.value.split("-") as [
								SortField,
								SortDirection,
							];
							setSortField(field);
							setSortDirection(direction);
						}}
					>
						{sortOptions.map((option) => (
							<option
								key={`${option.field}-${option.direction}`}
								value={`${option.field}-${option.direction}`}
							>
								{option.label}
							</option>
						))}
					</select>
					<span className="text-sm text-gray-500 ml-2">表示件数:</span>
					<select
						className="border rounded-md p-2 text-sm"
						value={itemsPerPage}
						onChange={(e) => {
							setItemsPerPage(Number(e.target.value));
							setCurrentPage(1);
						}}
					>
						{displayPerPageOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>

			{filteredLists.length === 0 ? (
				<div className="text-center p-8 bg-gray-50 rounded-lg border">
					<p>検索条件に一致する問題リストが見つかりませんでした。</p>
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
					{filteredLists
						.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
						.map((list) => (
							<ProblemListCard key={list.id} list={list} />
						))}
				</div>
			)}
			<div className="flex justify-center mt-6">
				<Pagenation
					currentPage={currentPage}
					totalPages={Math.ceil(filteredLists.length / itemsPerPage)}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
}
