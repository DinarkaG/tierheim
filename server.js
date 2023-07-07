// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var path = require('path');
var mysql = require('mysql');

bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// configuration =================
app.use(express.static(path.join(__dirname, '/dist/tierheim'))); // TODO rename to your app-name

const connection = mysql.createConnection({
  port: '3306',
  database: 'tierheim',
  host: 'localhost',
  user: 'root',
  password: 'password',
  insecureAuth: true
});

connection.connect((err) => {
  if (err) {
    console.error('Fehler beim Verbinden zur Datenbank:', err);
    return;
  }
  console.log('Verbunden mit der Datenbank.');
});

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tierheim',
});

// Define an API endpoint for fetching users
app.get('/api/katze', (req, res) => {
  // Perform the database query
  pool.query('SELECT * FROM tier WHERE tierart = \'Katze\'', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
    } else {
      console.log('Retrieved data from the "tier" table: ', results);
      res.json(results);
    }
  });
});

app.get('/api/hund', (req, res) => {
  // Perform the database query
  pool.query('SELECT * FROM tier WHERE tierart = \'Hund\'', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
    } else {
      console.log('Retrieved data from the "tier" table: ', results);
      res.json(results);
    }
  });
});

app.get('/api/kleintier', (req, res) => {
  // Perform the database query
  pool.query('SELECT * FROM tier WHERE tierart = \'Kleintier\'', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
    } else {
      console.log('Retrieved data from the "tier" table: ', results);
      res.json(results);
    }
  });
});

// Define an API endpoint for fetching admins
app.get('/api/admin', (req, res) => {
  // Perform the database query
  pool.query('SELECT * FROM admin', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
    } else {
      console.log('Retrieved data from the "admin" table: ', results);
      res.json(results);
    }
  });
});

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
  console.log('App listening on port 8080');
});

// application -------------------------------------------------------------
app.get('/', function (req, res) {
  //res.send("Hello World123");
  res.sendFile('index.html', { root: __dirname + '/dist/tierheim' }); // TODO rename to your app-name
});
