import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagenation({
	currentPage,
	totalPages,
	setCurrentPage,
}: {
	currentPage: number;
	totalPages: number;
	setCurrentPage: (page: number) => void;
}) {
	const pageSet: Set<number> = new Set<number>([1, currentPage, totalPages]);
	for (let diff = 1; diff <= totalPages; diff = diff * 2) {
		pageSet.add(currentPage - diff);
		pageSet.add(currentPage + diff);
	}
	const pages = Array.from(pageSet)
		.sort((a, b) => a - b)
		.filter((page) => 1 <= page && page <= totalPages);
	return (
		<Pagination className="flex justify-center mt-4">
			<PaginationContent className="flex items-center space-x-1">
				{pages.map((page) => (
					<PaginationItem key={page} className="w-12 h-12 hover:cursor-pointer">
						<PaginationLink
							onClick={() => setCurrentPage(page)}
							aria-current={page === currentPage ? "page" : undefined}
							className={`flex items-center justify-center w-full h-full rounded transition-colors ${
								page === currentPage
									? "bg-blue-500 text-white"
									: "bg-white-50 text-gray-700 hover:bg-blue-100"
							} text-lg`}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}
			</PaginationContent>
		</Pagination>
	);
}
