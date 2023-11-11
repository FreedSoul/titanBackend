"use client";
import { useState, useReducer, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FC } from "react";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export type Row = {
  "PLANT/CUSTOMER": string | null;
  "AGGREGATE SOURCE": string | null;
  "QTY LOADED": string | null;
  "QTY MISSED": string | null;
  "AGG MATERIAL": string | null;
  QTY: string | null;
  "AGG CARRIER": string | null;
  MG: string | null;
  STATUS: string | null;
  "SPECIAL NOTES": string | null;
};

interface tableProps {
  dataJson: Array<Row>;
}

const TableJson: FC<tableProps> = ({ dataJson }) => {
  const columnHelper = createColumnHelper<Row>();

  const columns = [
    columnHelper.accessor((row) => row["PLANT/CUSTOMER"], {
      id: "PLANT or CUSTOMER",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>PLANT or CUSTOMER</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("AGGREGATE SOURCE", {
      header: () => "AGGREGATE SOURCE",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("QTY LOADED", {
      header: () => <span>Picked Up</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("QTY MISSED", {
      header: () => "# MISSED",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("AGG MATERIAL", {
      header: () => "AGGREGATE MATERIAL",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("QTY", {
      header: () => "Quantity",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("AGG CARRIER", {
      header: () => "AGGREGATE CARRIER",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("MG", {
      header: () => "MG",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("STATUS", {
      header: () => "STATUS",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("SPECIAL NOTES", {
      header: () => "SPECIAL NOTES",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
  ];
  // console.log(dataJson);
  const [data, setData] = useState(() => [...dataJson]);
  const [filtering, setFiltering] = useState<string>("");
  const [sorting, setSorting] = useState([]);
  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    state: { sorting: sorting, globalFilter: filtering },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setFiltering,
    // onSortingChange: setSorting,
  });
  return (
    <div>
      <div className="p-2">
        <DebouncedInput
          className="text-black"
          type="text"
          value={filtering??''}
          onChange={value => setFiltering(String(value))}
          placeholder="type to filter"
        />
        <table className="border-collapse border border-slate-500 ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-slate-500"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {/* {
                            {asc:'⬆👆', desc: '⬇🔻👇'}[
                                header.column.getIsSorted() ?? null
                            ]
                        } */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border border-slate-500 ">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </table>
        <div className="h-10" />
        <button
          onClick={() => rerender()}
          className="border-white border-2 border- p-2"
        >
          Rerender
        </button>
      </div>
    </div>
  );
};

export default TableJson;
