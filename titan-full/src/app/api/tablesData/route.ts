"use server";
import fs from 'fs'
import { type NextRequest, type NextResponse } from 'next/server';

// Specify the path to your JSON file
const jsonFilePath = './Outlook data Extraction/json_output.json';

type Row = {
  "PLANT or CUSTOMER": string,
  "AGGREGATE SOURCE": string,
  "# PICKED UP": null,
  "# MISSED": null,
  "AGG MATERIAL": string,
  "QTY": number,
  "AGG CARRIER": null,
  "MG": null,
  "SPECIAL NOTES": null
}
type Data = Array<Row>

export default async function getTableData() {
  // "use server";
  let jsonData: Data | null = null
  fs.readFile(jsonFilePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return;
    }
    try {
      jsonData = JSON.parse(data);
      //   const data = await jsonData.json()
      console.log('Data from JSON file:', jsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
  
  // if (jsonData !== null) {
  //   return jsonData
  //      return Response.json({ data: [] })
  // }
  
  return jsonData
}
