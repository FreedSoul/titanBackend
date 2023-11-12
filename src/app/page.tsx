import Image from "next/image";
// import getTableData from "./api/tablesData/route";
import { Suspense } from "react";
import type { Row } from "./components/tableJson";
import TableJson from "../app/components/tableJson";
import path from "path";
import { promises as fs } from 'fs';

export default async function Home() {
  // const datatable: Row[] = await getTableData();
  // const datatable: Row[] = data
  const file = await fs.readFile(process.cwd() + "/Outlook data Extraction/json_output.json", 'utf8');
  const datatable:Row[] = JSON.parse(file); 
  // console.log(data,'---------------------');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 dark:bg-slate-300 bg-slate-900  dark:text-black text-white">
      {/* <h1>{data}</h1> */}

      <h1 className=" flex w-full justify-center border-b-8 border-gray-300  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-zinc-800/30 lg:p-4 lg:dark:bg-gray-200 dark:text-black">
        Table for available routes
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <h1>{datatable}</h1> */}
        <TableJson dataJson={datatable}></TableJson>
      </Suspense>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a> */}
      </div>
    </main>
  );
}
