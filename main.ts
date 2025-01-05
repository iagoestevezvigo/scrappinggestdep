import * as fs from 'fs';
import * as cheerio from 'cheerio';

const htmlContent = fs.readFileSync('file.html', 'utf-8');
const $ = cheerio.load(htmlContent);

// Scrape some content
const heading = $('h1').text();
const paragraph = $('p').text();


//Select body of the table with the clasification
const tbody = $('#CL_Resumen > div:nth-of-type(2) > table:nth-of-type(1) > tbody');
    
// Iterate through every row of the table
tbody.find('tr').each((rowIndex, row) => {
    const rowData: string[] = [];  // Definir el tipo explícito del array como string[]
    
    // Iterate through the columns of each row
    $(row).find('td').each((colIndex, col) => {
        if (colIndex >= 3){
            rowData.push($(col).text().replace(/\s+/g, ' ').trim()); // Adding the text of every cel to a string list
        }
    });
    
    console.log(rowData.join('|')); // Show the data of the row
});
  