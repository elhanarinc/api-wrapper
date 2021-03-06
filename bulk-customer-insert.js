#!/usr/bin/env node
let argv = require('yargs').argv;
let axios = require('axios');
let csv = require('csv-parser');
let fs = require('fs');

let HEADERS = ['email', 'firstname', 'lastname', 'password'];
let CUSTOMER_ENDPOINT = '/api/V1/customers';
let ROWS = [];

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const insertCustomer = async (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, axiosConfig).then(response => {
      resolve(response.data);
    }).catch(e => {
      reject(e.response.data);
    });
  });
}

if (argv.file === undefined) {
  console.log('--file flag cannot be empty.');
  console.log('Sample usage:');
  console.log('       ./bulkCustomerInsert.js --file=sample.csv');
} else if (argv.url === undefined) {
  console.log('--url flag cannot be empty.');
  console.log('Sample usage:');
  console.log('       ./bulkCustomerInsert.js --url=localhost:3000');
} else {
  let filePath = argv.file;
  let urlPath= argv.url;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('headers', (headers) => {
      let difference = HEADERS.filter(x => !headers.includes(x));
      if (difference.length !== 0) {
        throw new Error('csv headers are corrupt. Headers should contain "email", "firstname", "lastname", "password"');
      }
    })
    .on('data', (data) => {
      ROWS.push(data);
    })
    .on('end', async () => {
      for (let i = 0; i < ROWS.length; i++) {
        let row = ROWS[i];
        console.log('Index: ', i);
        console.log('Row data:', row);
        try {
          let result = await insertCustomer(urlPath + CUSTOMER_ENDPOINT, row);
          console.log(result);
        } catch (e) {
          console.log(e);
        }
      }
    })
    .on('error', (error) => {
      console.log(error);
    });
}
