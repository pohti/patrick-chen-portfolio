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
  { accessorKey: 'changePercent', header: 'Change (%)' },
  { accessorKey: 'volume', header: 'Volume' },
  { accessorKey: 'marketCap', header: 'Market Cap' },
];

const WatchList = ({ currentEquity, setCurrentEquity }: Props) => {
  const table = useReactTable<Equity>({
    data: mockedEquities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange', // or 'onEnd' for snap resize
    enableColumnResizing: true,
  });

  return (
    <div className="watch-list">
      <span>Watchlist</span>
      {/* TODO: make the columns resizable */}
      <table className="min-w-full text-sm text-left">
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
            <tr key={row.id}>
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

export default WatchList;
