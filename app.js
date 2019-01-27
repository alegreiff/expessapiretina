//https://github.com/masfranzhuo/sequalize-express-SQLite
var express = require('express');
var app = express();

app.use((req, res, next) => {
    
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



var bodyParser = require('body-parser');
var sqlite = require('sqlite3');
var env = require('dotenv').load();
var port = process.env.PORT || 8080;

/*
var express = require('express')
var cors = require('cors')
var app = express()
*/

/*IMPORTAR*/
const _PELICULAS = require('./data/filmes.json')
const _FECHAX = require('./data/fechas1.json')
const _VISITAS = require('./data/visitas.json')
/* FIN IMPORTAR */
// models
var models = require("./models");

var Pelicula = require('./models').Pelicula;
var Fecha = require('./models').Fecha;
var Visita = require('./models').Visita;


// routes
var books = require('./routes/books');
var peliculas = require('./routes/peliculas');

//Sync Database
/*models.sequelize.sync({force: true})*/
models.sequelize.sync()

/*
  .then(() =>{
    Pelicula.bulkCreate(_PELICULAS)
    .then(Pelicula => {
      console.log('PELICULAS OK')
    })
    .catch(error => {
      console.log(error)
    })
  })
  .then(() =>{
    Fecha.bulkCreate(_FECHAX)
    .then(Pelicula => {
      console.log('FECHAS OK')
    })
    .catch(error => {
      console.log(error)
    })
  })
  .then(() =>{
    Visita.bulkCreate(_VISITAS)
    .then(Visita => {
      console.log('VISITAS OK')
    })
    .catch(error => {
      console.log(error)
    })
  })
  .catch(function (error) {
    console.log(error)
  })

*/







.then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// register routes
app.use('/books', books);
app.use('/peliculas', peliculas);

// index path
app.get('/', function(req, res){
    console.log('app listening on port: '+port);
    res.send('cateando  express nodejs sqlite')
});

app.listen(port, function(){
    console.log('app listening on port: '+port);
});

module.exports = app;
