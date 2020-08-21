'use strict';
import fs from "fs";
import csvtojson from "csvtojson";

const csvFilePath = 'data.csv';

csvtojson()
    .on('error',(error)=>{
      console.log(error)
    })
    .fromFile(csvFilePath)
    .then((jsonObj) => {

      const writeStream =  fs.createWriteStream('./file.txt', 'utf8');

      jsonObj.forEach((elem) => {
        writeStream.write(`${JSON.stringify(elem)}\n`);
      });

      writeStream.on("error", (error) => {
        console.log(error);
      })
    })
    .catch(console.log("Something gone wrong"));
