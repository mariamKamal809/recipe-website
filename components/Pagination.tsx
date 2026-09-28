interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 flex-wrap mt-10">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-card)] border border-black/10 text-[var(--color-navy)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Previous
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-9 h-9 rounded-full text-sm font-medium ${
                        page === currentPage
                            ? "bg-[var(--color-terracotta)] text-white"
                            : "bg-[var(--color-card)] border border-black/10 text-[var(--color-navy)]"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-card)] border border-black/10 text-[var(--color-navy)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}
