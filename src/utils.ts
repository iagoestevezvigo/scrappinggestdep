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

    const firstThText = $('.lpfTable01').first().find('th').first()
    .clone()
    .children()
    .remove()
    .end()
    .text()
    .trim();

    if (!firstThText.startsWith("JORNADA")) {
        position_of_table = position_of_table+1;
    }

    // Select the element with the ID 'tableClasif'
    const tableClasif = $('.lpfTable01 tbody').eq(position_of_table);
        
    const table: string[][] = [];

    // Iterate through all rows (<tr>) inside the tbody
    tableClasif.find('tr').each((rowindex, row) => {
        const rowData: string[] = [];
        if(rowindex>=1){
            // For each row, find all cells (<td>) and extract their text
            $(row).find('td').each((colindex, cell) => {
                if (colindex!=1){
                    const img = $(cell).find('img');
                    rowData.push( img.attr('src') ? ("https://www.lapreferente.com/"+img.attr('src')):'No image source');
                }
                rowData.push($(cell).text().trim());
            });
        
        }
        else{
            $(row).find('th').each((colindex, cell) => {
                const paragraphs = $(cell).find('p');

                let cleanText: string;

                if (paragraphs.length > 0) {
                    // Extraer texto de cada <p> y unirlos con un espacio
                    cleanText = Array.from(paragraphs)
                        .map(el => $(el).text().trim())
                        .join(' ');
                } else {
                    // Si no hay <p>, coger todo el texto del <th> excluyendo hijos como <img> u otros
                    cleanText = $(cell)
                        .clone()
                        .children()
                        .remove()
                        .end()
                        .text()
                        .replace(/\s+/g, ' ')
                        .trim();
                }

                rowData.push(cleanText);
            });

        }
        // Add data to the table if there is no resting
        if (!rowData.some(cell => cell.includes("Descansan"))) {
            table.push(rowData);
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