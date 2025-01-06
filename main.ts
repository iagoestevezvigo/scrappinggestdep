import * as fs from 'fs';
import * as utils from './src/utils';


const htmlContent = fs.readFileSync('file.html', 'utf-8');

var table = utils.getclasificationfromhtml(htmlContent);
console.log(table); // Show the table

var table = utils.getlastmatchresults(htmlContent);
console.log(table); // Show the table

table = utils.getnextmatchs(htmlContent);
console.log(table); // Show the table
  