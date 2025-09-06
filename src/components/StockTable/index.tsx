'use client';
import React from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { type Equity, useEquityStore } from '@/store/equity';
import './styles.css';

function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000_000)
    return `${(value / 1_000_000_000_000).toFixed(1)}T`;
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  return value.toLocaleString();
}

const columns: ColumnDef<Equity>[] = [
  {
    accessorKey: 'symbol',
    header: 'Symbol',
    size: 400,
    minSize: 100,
    maxSize: 500,
    enableResizing: true,
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'market', header: 'Market' },
  { accessorKey: 'price', header: 'Price ($)' },
  {
    accessorKey: 'changePercent',
    header: 'Change (%)',
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
    accessorKey: 'volume',
    header: 'Volume',
    cell: (info) => formatLargeNumber(info.getValue<number>()), // e.g. 28M
  },
  {
    accessorKey: 'marketCap',
    header: 'Market Cap',
    cell: (info) => formatLargeNumber(info.getValue<number>()), // e.g. 1.8T
  },
];

const StockTable = () => {
  const { equityList, currentEquity, setCurrentEquity } = useEquityStore();

  const table = useReactTable<Equity>({
    data: equityList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
  });

  const handleRowClick = (equity: Equity) => setCurrentEquity(equity);

  return (
    <div>
      <table className="min-w-full text-sm text-left watch-list">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className=" text-left px-6 py-4 ">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className={`equity-row ${row.original.symbol === currentEquity?.symbol && 'active'}`}
              key={row.id}
              onClick={() => handleRowClick(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
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

export default StockTable;
