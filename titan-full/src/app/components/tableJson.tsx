"use client";
import { useState, useReducer } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC } from "react";

// export type Row = {
//   "PLANT/CUSTOMER": string;
//   "AGGREGATE SOURCE": string;
//   "# PICKED UP": null;
//   "# MISSED": null;
//   "AGG MATERIAL": string;
//   QTY: number;
//   "AGG CARRIER": null;
//   MG: null;
//   "SPECIAL NOTES": null;
// };
export type Row = {
  "PLANT/CUSTOMER": string|null;
  "AGGREGATE SOURCE": string|null;
  "QTY LOADED": string|null;
  "QTY MISSED": string|null;
  "AGG MATERIAL": string|null;
  QTY: string|null;
  "AGG CARRIER": string|null;
  MG: string|null;
  STATUS: string|null;
  "SPECIAL NOTES": string|null;
};

interface tableProps {
  dataJson: Array<Row>;
}

const TableJson: FC<tableProps> = async ({ dataJson }) => {
  const columnHelper = createColumnHelper<Row>();

  const columns = [
    // columnHelper.accessor((row) => row["PLANT or CUSTOMER"], {
    //   id: "PLANT or CUSTOMER",
    //   cell: (info) => <i>{info.getValue()}</i>,
    //   header: () => <span>PLANT or CUSTOMER</span>,
    //   footer: (info) => info.column.id,
    // }),
    // columnHelper.accessor("PLANT or CUSTOMER", {
    //   cell: (info) => info.getValue(),
    //   footer: (info) => info.column.id,
    // }),
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
      header: "# MISSED",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("AGG MATERIAL", {
      header: "AGGREGATE MATERIAL",
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
  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <div className="p-2">
        <table className="border-collapse border border-slate-500 ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border border-slate-500">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
