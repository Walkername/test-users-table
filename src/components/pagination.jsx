export default function Pagination({ page, totalPages, onChange }) {
    return (
        <div className="pagination">
            <button disabled={page === 1} onClick={() => onChange(page - 1)}>
                Back
            </button>
            <span>
                {page} / {totalPages}
            </span>
            <button
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
}
