import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from "@/components/ui/pagination";

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
		<Pagination>
			<PaginationContent>
				{pages.map((page) => (
					<PaginationItem key={page} aria-current>
						<PaginationLink
							onClick={() => setCurrentPage(page)}
							aria-current={page === currentPage ? "page" : undefined}
							className={
								page === currentPage
									? "ring-2 ring-blue-500 rounded bg-blue-50"
									: ""
							}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}
			</PaginationContent>
		</Pagination>
	);
}
