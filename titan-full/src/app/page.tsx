import Image from "next/image";
import handler from "./api/hello";
import getTableData from "./api/tablesData/route";
import { Suspense } from "react";
import type { Row } from "./components/tableJson";
import TableJson from "../app/components/tableJson"

export default async function Home() {
  const datatable: Row[] = await getTableData();
  // console.log(datatable,'---------------------');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <h1>{data}</h1> */}

      <h1 className=" flex w-full justify-center border-b-8 border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Table for available routes
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <h1>{datatable}</h1> */}
        <TableJson dataJson={datatable}></TableJson>
      </Suspense>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
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
        </a>
      </div>
    </main>
  );
}
