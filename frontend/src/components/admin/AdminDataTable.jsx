// Generic admin data table with optional filters row.
import { Pagination } from '../common/Pagination.jsx';

export function AdminDataTable({
  columns = [],
  rows = [],
  page = 1,
  pageSize = 25,
  total = 0,
  loading = false,
  empty = 'No records found.',
  onPage,
  renderRow
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <>
      {loading
        ? <p className="catalog-state">Loading...</p>
        : (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} className={column.className}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length
                  ? rows.map((row, index) => renderRow(row, index))
                  : (
                    <tr>
                      <td colSpan={columns.length}>{empty}</td>
                    </tr>
                  )}
              </tbody>
            </table>
            <Pagination page={page} pages={pages} onPage={onPage} />
          </>
        )}
    </>
  );
}
