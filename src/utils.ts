import * as cheerio from 'cheerio';
export function getclasificationfromhtml(htmlContent: string): string[][] {
    const $ = cheerio.load(htmlContent);

    // Select the element with the ID 'tableClasif'
    const tableClasif = $('#tableClasif tbody');
        
    const table: string[][] = [];

    // Iterate through all rows (<tr>) inside the tbody
    tableClasif.find('tr').each((rowindex, row) => {
        if(rowindex>=1){
            const rowData: string[] = [];
            
            // For each row, find all cells (<td>) and extract their text
            $(row).find('td').each((colindex, cell) => {
                if (colindex!=1){
                    rowData.push($(cell).text().trim());
                }
                else{
                    const img = $(cell).find('img');
                    rowData.push( img.attr('src') ? ("https://www.lapreferente.com/"+img.attr('src')):'No image source');
                }
            });
        
            // Log the extracted row data
            table.push(rowData)
        }
        
    });
    return table;
}
export function getresultsfromtable(htmlContent: string, position_of_table:number): string[][]{
    const $ = cheerio.load(htmlContent);

    // Select the element with the ID 'tableClasif'
    const tableClasif = $('.lpfTable01 tbody').eq(position_of_table);
        
    const table: string[][] = [];

    // Iterate through all rows (<tr>) inside the tbody
    tableClasif.find('tr').each((rowindex, row) => {
        if(rowindex>=1){
            const rowData: string[] = [];
            
            // For each row, find all cells (<td>) and extract their text
            $(row).find('td').each((colindex, cell) => {
                if (colindex!=1){
                    const img = $(cell).find('img');
                    rowData.push( img.attr('src') ? ("https://www.lapreferente.com/"+img.attr('src')):'No image source');
                }
                rowData.push($(cell).text().trim());
            });
        
            // Add data to the table
            table.push(rowData)
        }
        
    });
    return table
}

export function getlastmatchresults(htmlContent: string): string[][] {
    return getresultsfromtable(htmlContent,0);
}

export function getnextmatchs(htmlContent: string): string[][] {
    return getresultsfromtable(htmlContent,2);
}