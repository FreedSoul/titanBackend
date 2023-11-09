import fs from 'fs' 
import { type } from 'os';

// Specify the path to your JSON file
const jsonFilePath:string = 'data.json';

type Row = {
    "PLANT or CUSTOMER":string,
    "AGGREGATE SOURCE":string,
    "# PICKED UP":null,
    "# MISSED":null,
    "AGG MATERIAL":string,
    "QTY":number,
    "AGG CARRIER":null,
    "MG":null,
    "SPECIAL NOTES":null
}
type Data = Array<Row>

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err:NodeJS.ErrnoException|null, data:string) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  try {
    // Parse the JSON data into a JavaScript object
    const jsonData:Data = JSON.parse(data);
    // const jsonData = JSON.parse(data);

    // Now you can work with the jsonData object
    console.log('Data from JSON file:', jsonData);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});
