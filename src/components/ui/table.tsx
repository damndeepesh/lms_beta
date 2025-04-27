import React from "react";

export type Column<T> = {
  key: keyof T;
  header: React.ReactNode;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
  className?: string;
};

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  rowClassName?: (row: T, rowIndex: number) => string;
  responsive?: boolean;
}

export function Table<T extends object>({
  columns,
  data,
  className = "",
  rowClassName,
  responsive = true,
}: TableProps<T>): React.JSX.Element {
  return (
    <div className={responsive ? "overflow-x-auto w-full" : undefined}>
      <table className={`min-w-full border-collapse ${className}`}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={String(col.key) + idx}
                className={`px-4 py-2 text-left bg-gray-100 dark:bg-gray-800 font-semibold border-b border-gray-200 dark:border-gray-700 ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-gray-500 dark:text-gray-400">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowClassName ? rowClassName(row, rowIndex) : "hover:bg-gray-50 dark:hover:bg-gray-700"}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={String(col.key) + colIndex}
                    className={`px-4 py-2 border-b border-gray-100 dark:border-gray-700 ${col.className || ""}`}
                  >
                    {col.render
                      ? col.render(row[col.key], row, rowIndex)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export const TableHead = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead {...props}>{children}</thead>
);
export const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props}>{children}</tr>
);
export const TableHeaderCell = ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th {...props}>{children}</th>
);
export const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props}>{children}</tbody>
);
export const TableCell = ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td {...props}>{children}</td>
);
// removed: export default Table;