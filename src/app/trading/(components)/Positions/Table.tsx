'use client';
import React from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useEquityStore } from '@/store/equity';
import { type Position, mockedPositions } from '@/store/position';

const columns: ColumnDef<Position>[] = [
  {
    accessorKey: 'symbol',
    header: 'Symbol',
    size: 400,
  },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'averagePrice', header: 'Avg. Price ($)' },
  { accessorKey: 'currentPrice', header: 'Current Price ($)' },
  { accessorKey: 'marketValue', header: 'Market Value ($)' },
  {
    accessorKey: 'unrealizedPL',
    header: 'Unrealized P/L ($)',
    cell: (info) => {
      const value = info.getValue<number>();
      const color = value > 0 ? 'green' : value < 0 ? 'red' : 'inherit';
      return (
        <span style={{ color }}>
          {value > 0 ? '+' : ''}
          {value.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: 'unrealizedPLPercent',
    header: 'Unrealized P/L (%)',
    cell: (info) => {
      const value = info.getValue<number>();
      const color = value > 0 ? 'green' : value < 0 ? 'red' : 'inherit';
      return (
        <span style={{ color }}>
          {value > 0 ? '+' : ''}
          {value}%
        </span>
      );
    },
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Updated',
    cell: (info) => {
      const value = info.getValue<string>();
      const date = new Date(value);
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getUTCFullYear();
      return `${day}-${month}-${year}`;
    },
  },
];

const Table = () => {
  const { currentEquity, setCurrentEquity } = useEquityStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const reactTable = useReactTable<Position>({
    data: mockedPositions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    state: { sorting },
    onSortingChange: setSorting,
  });

  const handleRowClick = (symbol: string) => setCurrentEquity(symbol);

  return (
    <div
      className="w-full overflow-x-auto"
      style={{
        maxHeight: '39vh',
        overflowY: 'auto', // Enable vertical scroll
      }}
    >
      <table className="min-w-[1200px] text-sm text-left watch-list">
        <thead>
          {reactTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, colIdx) => (
                <th
                  key={header.id}
                  className={`text-left px-6 py-4 cursor-pointer select-none${colIdx === 0 ? ' sticky-col' : ''}`}
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  style={{
                    userSelect: 'none',
                    left: colIdx === 0 ? 0 : undefined, // Needed for sticky
                    zIndex: colIdx === 0 ? 2 : undefined, // Ensure header stays above
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() && (
                    <span style={{ marginLeft: 6 }}>
                      {header.column.getIsSorted() === 'asc'
                        ? '▲'
                        : header.column.getIsSorted() === 'desc'
                          ? '▼'
                          : ''}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {reactTable.getRowModel().rows.map((row) => (
            <tr
              className={`equity-row ${
                row.original.symbol === currentEquity?.symbol && 'active'
              }`}
              key={row.id}
              onClick={() => handleRowClick(row.original.symbol)}
            >
              {row.getVisibleCells().map((cell, colIdx) => (
                <td
                  key={cell.id}
                  className={`px-6 py-4${colIdx === 0 ? ' sticky-col' : ''}`}
                  style={{
                    left: colIdx === 0 ? 0 : undefined,
                    zIndex: colIdx === 0 ? 1 : undefined,
                    background: colIdx === 0 ? '#1e1e1e' : undefined, // Optional: match table bg
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
