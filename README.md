# API Wrapper

Api wrapper for magento2 REST api written with Express.js

This project assumes you had already installed these tools:

1. [docker](https://www.docker.com/)
2. [docker-compose](https://docs.docker.com/compose/)
3. [nvm](https://github.com/nvm-sh/nvm)
4. [pm2](https://pm2.keymetrics.io/)
5. [postman](https://www.postman.com/)

#### Used Ports

1. **3000** for express.js
2. **9200** for elasticsearch
3. **5601** for kibana

### Installation

- Installation of node, npm, pm2, elasticsearch and kibana by using the command below:

  ```
  nvm install 10.15.3
  nvm use 10.15.3
  npm install pm2 -g
  docker compose up -d
  ```

- You should wait **approximately 5** seconds for elasticsearch and kibana to be alive. After you are certain, you can use `update-elasticsearch.js` for populating the elasticsearch.

  ```
  node update-elasticsearch.js
  ```

### Sample Usage of API

- You can start the API by using the command below:
  `pm2 start ecosystem.config.js`

- You can watch your cluster by using the commands below:

  ```
  pm2 monit
  pm2 list
  ```

- You can find the example `POSTMAN` collection as _api-wrapper.postman_collection.json_ on the directory. You can import the file and try each request on `POSTMAN`.

### Read and Bulk Insert

- You can use `bulk-customer-insert.js` for reading csv and bulk inserting customers.
  Sample usage:

```
chmod +x bulk-customer-insert.js
./bulk-customer-insert.js --file=sample.csv --url=http://localhost:3000
```

### Localization

- You can add _en_, _tr_, _ar_ language files as a **JSON** file under the _lang_ directory, api will support the localization for these languages.

- Sample _tr_ file:

```
{
  "United Arab Emirates": "Birlesik Arap Emirlikleri",
  "Afghanistan": "Afganistan",
  "Albania": "Arnavutluk",
  "Andorra": "Andora",
  "Default Category": "Standart Kategori",
  "What's New": "Yeni Ne Var",
  "Jackets": "Ceketler",
  "Email is not valid.": "Email gecerli degil.",
  "Firstname is required.": "Firstname gerekli.",
  "Lastname is required.": "Lastname gerekli.",
  "Password min length is 5 and should be alphanumeric.": "Password en az 5 karakter ve alfanumerik olmali.",
  "Internal Server Error": "Icsel Sunucu Hatasi.",
  "A customer with the same email address already exists in an associated website.": "Ayni emaili olan kayitli bir kullanici zaten var.",
  "Bad Request": "Gecersiz istek."
}

```

#### Customer Password Constraints

- Customer password should be greater than **5** and the characters in the password should be **Alphanumeric**.
- Sample Customer Data:
  ```
  {
    "email": "johndoe@gmail.com",
    "firstname": "John",
    "lastname": "Doe",
    "password": "asd123ASD"
  }
  ```
