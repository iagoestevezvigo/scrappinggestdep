import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { get } from 'axios';

function getclasificationfromhtml(htmlContent: string): string[][] {
    const $ = cheerio.load(htmlContent);

    // Scrape some content
    const heading = $('h1').text();
    const paragraph = $('p').text();


    //Select body of the table with the clasification
    const tbody = $('#CL_Resumen > div:nth-of-type(2) > table:nth-of-type(1) > tbody');
        
    const table: string[][] = [];
    // Iterate through every row of the table
    tbody.find('tr').each((rowIndex, row) => {
        const rowData: string[] = [];
        
        // Iterate through the columns of each row
        $(row).find('td').each((colIndex, col) => {
            if (colIndex >= 3){
                rowData.push($(col).text().replace(/\s+/g, ' ').trim()); // Adding the text of every cel to a string list
            }
        });
        if (rowData.length>0){
            table.push(rowData); // Adding the row to the clasification table
        }
    });
    
    return table;
}


const htmlContent = fs.readFileSync('file.html', 'utf-8');
const table = getclasificationfromhtml(htmlContent);
console.log(table); // Show the table
  