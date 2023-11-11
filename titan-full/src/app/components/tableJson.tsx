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
import twMerge from "clsx";

if (typeof window !== 'undefined') {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme',"dark")
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('theme')
  }
  
  // Whenever the user explicitly chooses light mode
  localStorage.theme = 'light'
  
  // Whenever the user explicitly chooses dark mode
  localStorage.theme = 'dark'
  
  // Whenever the user explicitly chooses to respect the OS preference
  // localStorage.removeItem('theme')
  
}

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
  function toggleDarkMode(){
    document.documentElement.classList.toggle('dark')
  }

  
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
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [filtering, setFiltering] = useState<string>("");
  const [sorting, setSorting] = useState([]);
  const rerender = useReducer(() => ({}), {})[1];

  useEffect(() => {
    if (typeof window !== 'undefined') {
    let value = window.localStorage.getItem("theme") || "light"
    value === 'light'? setDarkMode(false): setDarkMode(true)
    }
    console.log(darkMode);
  }, [])

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
      <div className="p-4 space-x-10">
        <DebouncedInput
          // className="text-black border-2 border-dashed p-1 bg-teal-400 placeholder:text-black"
          className="px-4 py-2 border-2 border-teal-400 rounded-sm outline-none  focus:border-grey-700 text-black"
          type="text"
          value={filtering ?? ""}
          onChange={(value) => setFiltering(String(value))}
          placeholder="type to filter"
        />
        <button
          onClick={() => {toggleDarkMode(), setDarkMode(darkMode=>!darkMode)}}
          className={twMerge(
            "relative inline-flex items-center border-2 border-teal-500 px-4 py-2 text-sm font-semibold transition-colors focus:z-10",
            "dark:focus:border-teal-400 dark:focus:ring-teal-400 hover:bg-teal-400 hover:text-black hover:dark:text-white",
          )}
        >
          {darkMode === false ?'Dark Mode':'Light Mode'} 
        </button> 
      </div>
      <div className="p-4">
        <table className="border-collapse border border-slate-500 ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-slate-500 bg-teal-500 text-black dark:bg-black dark:text-teal-500"
                    onClick={header.column.getToggleSortingHandler()}
                  >
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
              <tr key={row.id} className="border-teal-500 border-2 dark:border-black ">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id} className="border border-slate-500 bg-teal-500 text-black dark:bg-black dark:text-teal-500">
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
          </tfoot>
        </table>
        <div className="h-10" />
        <button
          onClick={() => {rerender()}}
          className={twMerge(
            "relative inline-flex items-center border-2 border-teal-500 px-4 py-2 text-sm font-semibold transition-colors focus:z-10 focus:outline-none focus:ring-1",
            "dark:focus:border-teal-400 dark:focus:ring-teal-400 hover:bg-teal-400 hover:text-black hover:dark:text-white",
          )}
        >
          Rerender
        </button>
      </div>
    </div>
  );
};

export default TableJson;
