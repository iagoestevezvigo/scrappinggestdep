import * as fs from 'fs';
import * as cheerio from 'cheerio';

function getclasificationfromhtml(htmlContent: string): string[][] {
    const $ = cheerio.load(htmlContent);
    function ntype(n, i) {
        var t = [2, 5, 9, 4, 1, 0, 8, 6, 3, 7, 1, 3, 5, 7, 9, 0, 2, 4, 6, 8, 0, 2, 4, 6, 8, 1, 3, 5, 7, 9, 7, 5, 2, 0, 9, 6, 3, 8, 4, 1];
        const index = (i * 10) + n;  // Calc the value from n and i
        const result = t[index];  // Get the value of the array in that specific position
        return result
    }

    //Select body of the table with the clasification
    const tbody = $('#CL_Resumen > div:nth-of-type(2) > table:nth-of-type(1) > tbody');
        
    const table: string[][] = [];
    // Iterate through every row of the table
    tbody.find('tr').each((rowIndex, row) => {
        const rowData: string[] = [];
        
        // Iterate through the columns of each row
        $(row).find('td').each((colIndex, col) => {
            if (colIndex==4){
                const scriptContent = $(row).find('script').first().html()
                 // Usar una expresión regular para extraer los valores de n e i (sin depender del id específico)
                const regex = /ntype\("([^"]+)",(\d+),(\d+),/;
                const matches = scriptContent?.match(regex);

                if (matches && matches.length === 4) {
                    const n = parseInt(matches[2], 10);  // Segundo valor
                    const i = parseInt(matches[3], 10);  // Tercer valor

                    console.log(`ntype: ${ntype(n,i)}`);
                    console.log(`points: ${$(col).text().replace(/\s+/g, ' ').trim()}${ntype(n,i)}`);
                }
            }
            
            if (colIndex >= 3 && colIndex!=4){
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
// console.log(table); // Show the table
  