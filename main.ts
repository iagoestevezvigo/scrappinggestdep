import * as fs from 'fs';
import * as cheerio from 'cheerio';

const htmlContent = fs.readFileSync('file.html', 'utf-8');
const anExampleVariable = "Hello World"
console.log(anExampleVariable)
console.log(htmlContent)
const $ = cheerio.load(htmlContent);

// Scrape some content
const heading = $('h1').text();
const paragraph = $('p').text();


// Puedes manipular o imprimir la tabla aquí
// Seleccionar solo la primera tabla con las clases 'table' y 'table-bordered'
// const table = $('table.table.table-bordered').first();
// // Buscar el <tbody> dentro de cada tabla
// const tbody = $(table).find('tbody');

const tbody = $('#CL_Resumen > div:nth-of-type(2) > table:nth-of-type(1) > tbody');
    
// Iterar sobre las filas (<tr>) dentro del <tbody>
tbody.find('tr').each((rowIndex, row) => {
    const rowData: string[] = [];  // Definir el tipo explícito del array como string[]
    
    // Iterar sobre las celdas (<td>) dentro de cada fila
    $(row).find('td').each((colIndex, col) => {
        if (colIndex==4){
            // Buscar el primer <i> con la clase fa-solid y extraer el texto visible
            const visibleNumber = $(col).find('i.fa-solid').first().text().trim();  // Esto debería darte el "2"
                
            // Buscar el número dentro del script, en este caso '6' dentro de ntype("idh112919",6,0,"fa-6")
            const scriptValue = $('script')
            scriptValue.filter((_, script) => $(script).html().includes('ntype("idh112919",6,0,"fa-6")'))
            .html();  // Obtener el contenido del script

            // Usar una expresión regular para extraer el número '6' del script
            const regex = /ntype\("idh112919",(\d+)/;
            const match = regex.exec(scriptValue || '');
            const scriptNumber = match ? match[1] : null; // Esto debería darte el "6" si está presente

            // Mostrar los números extraídos
            console.log(`Visible Number: ${visibleNumber}`); // Debería mostrar '2'
            console.log(`Script Number: ${scriptNumber}`);   // Debería mostrar '6'
        }
        if (colIndex >= 3 && colIndex!==4){
            rowData.push($(col).text().replace(/\s+/g, ' ').trim()); // Obtener el texto de cada celda
        }
    });
    
    console.log(rowData.join('|')); // Mostrar los datos de la fila
});

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.
  