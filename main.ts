import * as fs from 'fs';
import * as cheerio from 'cheerio';

function getclasificationfromhtml(htmlContent: string): string[][] {
    function ntype(n:number, i:number) {
        var t = ["2", "5", "9", "4", "1", "0", "8", "6", "3", "7", "1", "3", "5", "7", "9", "0", "2", "4", "6", "8", "0", "2", "4", "6", "8", "1", "3", "5", "7", "9", "7", "5", "2", "0", "9", "6", "3", "8", "4", "1"];
        const index = (i * 10) + n;  // Calc the value from n and i
        const result = t[index];  // Get the value of the array in that specific position
        return result
    }
    const $ = cheerio.load(htmlContent);

    //Select body of the table with the clasification
    const tbody = $('#CL_Resumen > div:nth-of-type(2) > table:nth-of-type(1) > tbody');
        
    const table: string[][] = [];
    // Iterate through every row of the table
    tbody.find('tr').each((rowIndex, row) => {
        const rowData: string[] = [];
        // Iterate through the columns of each row
        $(row).find('td').each((colIndex, col) => {
            if (colIndex>=3){
                var value:string="";
                const input = $(col).text()
                // First, replace "ntype" with ";ntype" so we can split by ";"
                const formattedString = input.replace(/ntype/g, ';ntype');

                // Now split by ";"
                const result = formattedString.split(';').filter(item => item.trim() !== '');
                // console.log(input)
                // console.log(result);
                result.forEach(item => {
                    if (item.includes('ntype')) {
                        const values = item.split(',');

                        const n = parseInt(values[1].trim());
                        const i = parseInt(values[2].trim());
                        value=value+ntype(n,i);
                    }
                    else{
                        value=value+item
                    }
                });
                // console.log(value);
                // console.log("---------")
                rowData.push(value)
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
  