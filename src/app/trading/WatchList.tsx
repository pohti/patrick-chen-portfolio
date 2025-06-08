import React from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { type Equity, mockedEquities } from './data';

interface Props {
  currentEquity: string;
  setCurrentEquity: (equity: string) => void;
}

const columns: ColumnDef<Equity>[] = [
  { accessorKey: 'symbol', header: 'Symbol' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'market', header: 'Market' },
  { accessorKey: 'price', header: 'Price ($)' },
  { accessorKey: 'changePercent', header: 'Change (%)' },
  { accessorKey: 'volume', header: 'Volume' },
  { accessorKey: 'marketCap', header: 'Market Cap' },
];

const WatchList = ({ currentEquity, setCurrentEquity }: Props) => {
  const table = useReactTable<Equity>({
    data: mockedEquities,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <span>Watchlist</span>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border">
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border">
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

export default WatchList;
