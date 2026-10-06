// Pagination controls.
export function Pagination({ page, pages, onPage }) {
  if (pages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Pages">
      <button type="button" className="outline" disabled={page <= 1} onClick={() => onPage?.(page - 1)}>
        Previous
      </button>
      <span>Page {page} of {pages}</span>
      <button type="button" className="outline" disabled={page >= pages} onClick={() => onPage?.(page + 1)}>
        Next
      </button>
    </nav>
  );
}
