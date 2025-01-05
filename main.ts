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
        if (colIndex >= 3){
            rowData.push($(col).text().replace(/\s+/g, ' ').trim()); // Obtener el texto de cada celda
        }
    });
    
    console.log(rowData.join('|')); // Mostrar los datos de la fila
});

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.
  