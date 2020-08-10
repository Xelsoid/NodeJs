'use strict';
import csvtojson from 'csvtojson';
import fs from 'fs';
import util from 'util';
import stream from 'stream';

const csvFilePath = 'data.csv';
const pipeline = util.promisify(stream.pipeline);

async function run() {
  await pipeline(
      csvtojson()
          .fromFile(csvFilePath)
          .preRawData((csvRawData) => {
            return new Promise((resolve,reject) => {
              resolve(csvRawData);
              reject(console.log("Error Happened"))
            })}),
      fs.createWriteStream('./file2.txt', 'utf8')
  );
  console.log('Pipeline succeeded.');
}

run().catch(console.error);
