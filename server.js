// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var path = require('path');
var mysql = require('mysql');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

bodyParser = require('body-parser');

// Unterstützt Parsen von Beitragsdaten vom Typ JSON
app.use(bodyParser.json());

// Unterstützt Parsen von x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Konfiguration------------
app.use(express.static(path.join(__dirname, '/dist/tierheim'))); // TODO rename to your app-name

// VERBINDUNG MIT DER DATENBANK _______________________________________________________
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

// POOL VERBINDUNG HERSTELLEN ___________________________________________________________
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tierheim',
});

// API für die tier Daten | get
app.get('/api/tierg', (req, res) => {
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

app.get('/api/katze', (req, res) => {
  pool.query('SELECT * FROM tier WHERE tierart = \'Katze\'', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
    } else {
      res.json(results);
    }
  });
});

app.get('/api/hund', (req, res) => {
  pool.query('SELECT * FROM tier WHERE tierart = \'Hund\'', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
    } else {
      res.json(results);
    }
  });
});

app.get('/api/kleintier', (req, res) => {
  pool.query('SELECT * FROM tier WHERE tierart = \'Kleintier\'', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
    } else {
      res.json(results);
    }
  });
});


// Server Aktualisierung ----------------------

io.on('connection', (socket) => {
  //console.log('Verbindung zum Socket.io-Server hergestellt.');
  socket.on('disconnect', () => {
    //console.log('Verbindung zum Socket.io-Server getrennt.');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Socket.io-Server läuft auf Port ${port}`);
});

// API für die Spendensumme | get
app.get('/api/spendenSum', (req, res) => {
  const query = 'SELECT SUM(wert) AS sum FROM spende';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ message: 'Error retrieving data' });
    } else {
      const sum = results[0].sum || 0;
      res.status(200).json({ sum });

      io.emit('update', { sum });
    }
  });
});

app.post('/api/addSpenden', (req, res) => {
  const { wert } = req.body;
  // Füge den 'wert' in die 'spende' Tabelle ein
  const query = 'INSERT INTO spende (wert) VALUES (?)';
  connection.query(query, [wert], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Error inserting data' });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Data inserted successfully' });

      const sumQuery = 'SELECT SUM(wert) AS sum FROM spende';
      connection.query(sumQuery, (sumError, sumResults) => {
        if (sumError) {
          console.error('Error retrieving sum:', sumError);
        } else {
          const sum = sumResults[0].sum || 0;
          io.emit('update', { sum }); // 'update' wird an alle verbundenen Clients weitergeleiten
        }
      });
    }
  });
});

// API für die admin Daten | get
app.get('/api/admin', (req, res) => {
  pool.query('SELECT * FROM admin', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
    } else {
      console.log('Retrieved data from the "admin" table: ', results);
      res.json(results);
    }
  });
});

// API für die kontakt Daten | get
app.get('/api/kontaktg', (req, res) => {
  pool.query('SELECT * FROM kontakt', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
    } else {
      res.json(results);
    }
  });
});

// API für die newsletter Daten | get
app.get('/api/getemail', (req, res) => {
  pool.query('SELECT * FROM newsletter', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
    } else {
      res.json(results);
    }
  });
});

// API für die newsletter Daten | post
app.post('/api/addEmail', (req, res) => {
  const { email } = req.body;

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

// API für die admin Daten | post
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
        const adminId = results[0].admin_id;
        res.json({ success: true, adminId });
      } else {
        // Falscher username oder passwort
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
});

// API für die spenden Daten | delete
app.delete('/api/changeSpenden', (req, res) => {
  const query = 'DELETE FROM spende WHERE rechnungsnummer > 0';
  connection.query(query,(error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ message: 'Spenden erfolgreich gelöscht' });
    }
  });
});

// API für die kontakt Daten | post
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
  res.sendFile('index.html', { root: __dirname + '/dist/tierheim' });
});
