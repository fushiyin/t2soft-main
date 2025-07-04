import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

const SmartPagination = ({ currentPage, totalPages, onPageChange }) => {
	const generatePageItems = () => {
		const pages = [];

		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			pages.push(1);

			if (currentPage > 3) pages.push("start-ellipsis");

			const start = Math.max(2, currentPage - 1);
			const end = Math.min(totalPages - 1, currentPage + 1);
			for (let i = start; i <= end; i++) pages.push(i);

			if (currentPage < totalPages - 2) pages.push("end-ellipsis");

			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
					/>
				</PaginationItem>

				{generatePageItems().map((item, idx) =>
					typeof item === "string" ? (
						<PaginationItem key={idx}>
							<span className="px-3 text-muted-foreground">...</span>
						</PaginationItem>
					) : (
						<PaginationItem key={item}>
							<PaginationLink
								onClick={() => onPageChange(item)}
								active={currentPage === item}
							>
								{item}
							</PaginationLink>
						</PaginationItem>
					),
				)}

				<PaginationItem>
					<PaginationNext
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default SmartPagination;
