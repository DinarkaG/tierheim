// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var path     = require('path');
var mysql    = require('mysql');

bodyParser = require('body-parser');


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// configuration =================
app.use(express.static(path.join(__dirname, '/dist/tierheim')));  //TODO rename to your app-name

// listen (start app with node server.js) ======================================
app.listen(8080, function(){
  console.log("App listening on port 8080");
});

// application -------------------------------------------------------------
app.get('/', function(req,res)
{
  //res.send("Hello World123");
  res.sendFile('index.html', { root: __dirname+'/dist/tierheim' });    //TODO rename to your app-name
});

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

const query = 'SELECT * FROM tier';
connection.query(query, (error, results) => {
  if (error) {
    console.error('Error retrieving data:', error);
    return;
  }
  console.log('Retrieved data:', results);
});
