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

app.get('/api/tierg', (req, res) => {
  // Query the tier table to fetch all tier data
  const query = 'SELECT * FROM tier';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/tierp', (req, res) => {
  const newTier = req.body;

  // Insert the new tier data into the tier table
  const query = 'INSERT INTO tier SET ?';
  connection.query(query, newTier, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      const insertedTierId = result.insertId;
      res.json({ success: true, tierId: insertedTierId });
    }
  });
});

app.put('/api/tier/:tierId', (req, res) => {
  const tierId = req.params.tierId;
  const updatedTier = req.body;

  // Update the tier data in the tier table
  const query = 'UPDATE tier SET ? WHERE tier_id = ?';
  connection.query(query, [updatedTier, tierId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ success: true });
    }
  });
});

app.delete('/api/tierd/:tierId', (req, res) => {
  const tierId = req.params.tierId;

  // Delete the tier with the specified ID from the tier table
  const query = 'DELETE FROM tier WHERE tier_id = ?';
  connection.query(query, [tierId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ success: true });
    }
  });
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

app.post('/api/addSpenden', (req, res) => {
  const { wert } = req.body; // Assuming the button click sends the 'wert' value in the request body

  // Insert the 'wert' value into the 'spenden' table
  const query = 'INSERT INTO spende (wert) VALUES (?)';
  connection.query(query, [wert], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Error inserting data' });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});

app.delete('/api/changeSpenden', (req, res) => {
  /*const {spendenwert} = req.query;*/

  const query = 'DELETE FROM spende WHERE rechnungsnummer > 0';

  connection.query(query,(error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ message: 'Spenden erfolgreich gelöscht' });
    }
  });
}); // Define an API endpoint for fetching admins

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

app.get('/api/spendenSum', (req, res) => {
  const query = 'SELECT SUM(wert) AS sum FROM spende';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ message: 'Error retrieving data' });
    } else {
      const sum = results[0].sum || 0;
      res.status(200).json({ sum });
    }
  });
});


// Newsletter Datenbank
app.post('/api/addEmail', (req, res) => {
  const { email } = req.body; // Assuming the button click sends the 'wert' value in the request body

  // Insert the 'wert' value into the 'spenden' table
  const query = 'INSERT INTO newsletter (email) VALUES (?)';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Error inserting data' });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Query the admin table to check if the username and password match
  const query = 'SELECT admin_id FROM admin WHERE benutzername = ? AND passwort = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (results.length > 0) {
        const adminId = results[0].admin_id; // Retrieve the admin's admin_id from the query result
        // Login successful, return the admin's admin_id
        res.json({ success: true, adminId });
      } else {
        // Invalid username or password
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, nachricht } = req.body;

  const query = 'INSERT INTO kontakt (name, email, nachricht) VALUES (?, ?, ?)';

  connection.query(query, [name, email, nachricht], (error, results) => {
    if (error) {
      console.error('Error saving message to database:', error);
      res.status(500).json({ message: 'Error saving message to database' });
    } else {
      res.status(200).json({ message: 'Message saved to database' });
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



