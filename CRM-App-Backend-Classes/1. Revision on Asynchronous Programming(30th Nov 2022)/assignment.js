/**
 * Problem statement: 
 * Your task is to write an async function `finder`. 
 * It will take an array of file names (filenames) in the 
 * form of a string and return a two-dimensional array where 
 * each inner array has the following values at each index.
 * 
 * Index 0: file name in the form of string
 * 
 * Index 1: boolean value where true value means the 
 * file does exist and false value means the file does not
 */

const fs = require('fs')

const finder = async function (filenames) {
    let result = []
    for (let i = 0; i < filenames.length; i++) {
      try {
        let filePresent = false;
        let readfilenames = new Promise((resolve, reject) => {
          fs.readFile(filenames[i], "utf-8", (err, data) => {
            if (err) {
              reject([filenames[i], filePresent]);
            } else {
              filePresent = true;
              resolve([filenames[i], filePresent]);
            }
          });
        });
        let data = await readfilenames;
        result.push(data)
      } catch (err) {
        result.push(err);
      }
    }
    return result
  };


let filenames = [
    "./crm-app/1. Revision on Asynchronous Programming(30th Nov 2022)/assignment.js",
    "./crm-app/README.md",
    "xyz.txt"
]


finder(filenames).then(data => console.log(data))