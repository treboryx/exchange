const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env configuration
dotenv.config({ path: "./config.env" });

// *********************************************
/*              DB CONNECTION               */
const db = mysql.createConnection(
  {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
  });

db.connect((err) => {
  if (err) return console.log("Something went wrong while trying to connect to the database", err);
  console.log("Successfully connected to the database");
});

const app = express();

app.use(cors()); // using this to avoid cross origin conflicts

// Routes, including GET, PUT, POST & DELETE requests
app.use("/api/convert/:amount/:from/:to", (req, res) => { // convert route, calculate the conversion and serve it to the user.
  const { amount, from, to } = req.params;
  db.query(`SELECT \`${to}\` FROM \`${from}\``, function (err, results, fields) {
    if (results) {
      const obj = {
        "rate": Number(results[0][to]),
        "result": amount * results[0][to]
      };
      // console.log(obj)
      res.status(200).json(obj);
    } else {
      res.json({ message: `Sorry, we have no rates for ${from.toUpperCase()} => ${to.toUpperCase()}` });
    }
  });
});

app.post("/api/new", (req, res) => { // POST request, add a new exchange rate
  const { from, to, rate } = req.query;
  // because res cannot be reached from inside the query functions below due to the depth of functions 
  // we create this function which can be accessed from inside and use it to return json data
  const resolution = (message) => {
    res.json(message);
  };
  db.query(`SELECT \`${to}\` FROM \`${from}\``, function (err, results, fields) { // checking if the rate already exists
    if (results) { // if it does, we return this message
      res.json({ message: "A rate already exists for this conversion." });
    } else { // if it doesn't we check if the table exists (the from currency)
      db.query(`SELECT * FROM \`${from}\``, function (err, results, fields) {
        if (results) { // if it does we alter it and add the to currency
          db.query(`ALTER TABLE \`${from}\` ADD COLUMN \`${to}\` VARCHAR(20)`, function (err, results, fields) {
            if (err) { return console.log(`There was an issue while modifying the ${from} table.`); }
            db.query(`UPDATE \`${from}\` SET \`${to}\` = ${rate}`, function (err, results, fields) { // update the data with the requested rate
              resolution({ success: "Successfully added" });
            });
          });
        } else { // if it doesnt we create a new table for that currency and insert the data
          db.query(`CREATE TABLE exchange.\`${from}\` (\`${to}\` VARCHAR(20))`, function (err, res, fields) {
            if (err) { console.log(err); }
            db.query(`INSERT INTO \`${from}\` (\`${to}\`) VALUES (${rate})`, function (err, results, fields) {
              if (err) { console.log(err); }
              resolution({ success: "Successfully added" });
            });
          });
        }
      });
    }
  });
});

app.put("/api/update", (req, res) => { // PUT request, we use this to update rates that are requested
  const { from, to, rate } = req.query;
  db.query(`UPDATE \`${from}\` SET \`${to}\` = ${rate}`, function (err, results, fields) {
    if (err) { console.log(err); }
    res.json({ success: "Successfully updated the database." });
  });
});

app.delete("/api/delete", (req, res) => { // DELETE request, drop the requested table (currency)
  const { currency } = req.query;
  db.query(`DROP TABLE ${currency}`, function (err, results, fields) {
    if (err) {
      res.json({ message: "Something went wrong." });
      console.log(err);
    }
    res.json({ success: "Successfully deleted currency from database" });
  });
});

app.get("/api/currencies", (req, res) => { // get currency tables, returns an array with the currency tables
  db.query("show tables", function (err, results, fields) {
    const arr = [];
    for (let i = 0; i < results.length; i++) {
      arr.push(Object.values(results[i])[0].toUpperCase());
    }
    res.json(arr);
  });
});

app.get("/api/currencies/:currency", (req, res) => { // returns an array of currencies that the requested currency is convertible to 
  const { currency } = req.params;
  db.query(`SELECT * FROM \`${currency}\``, function (err, results, fields) {
    const arr = [];
    // loop through the returned data from our database
    // we only need the keys in this case (the currencies and not the values)
    // with this loop, we convert each key to UppperCase so they're data ready to be presented
    Object.keys(results[0]).forEach(e => {
      arr.push(e.toUpperCase());
    });
    res.json(arr);
  });
});

app.get("/api/rates/:from/:to", (req, res) => { // returns exchange rate from currency to currency (from currency is = 1)
  const { from, to } = req.params;
  db.query(`SELECT \`${to}\` FROM \`${from}\``, function (err, results, fields) {
    const arr = [];
    Object.values(results[0]).forEach(e => {
      arr.push(e);
    });
    res.json(arr);
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});