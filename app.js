//https://github.com/masfranzhuo/sequalize-express-SQLite
const compression = require('compression');
var express = require('express');
var cors = require('cors')
var app = express();

var whitelist = ['*']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors())
app.use(compression());


/*app.use((req, res, next) => {

    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/

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
const _FECHAX = require('./data/__fechas.json')
const _VISITAS = require('./data/visitas.json')
const _ESTADISTICAS = require('./data/EEstadisticas.json')
const _EDAD = require('./data/Edad.json')
const _ADQUISICION = require('./data/Adquisicion.json')
const _GENERO = require('./data/Genero.json')
const _TECNOLOGIA = require('./data/Tecnologia.json')
const _PAIS = require('./data/paises.json')

/* FIN IMPORTAR */
// models
var models = require("./models");

var Pelicula = require('./models').Pelicula;
var Fecha = require('./models').Fecha;
var Visita = require('./models').Visita;
var Estadistica = require('./models').Estadistica;
var Edad = require('./models').Edad;
var Adquisicion = require('./models').Adquisicion;
var Genero = require('./models').Genero;
var Tecnologia = require('./models').Tecnologia;
var Pais = require('./models').Pais;


//RELACIONES ENTRE TABLAS
Pelicula.hasMany(Fecha, {as: 'temporadas'})
Pelicula.hasMany(Visita, {as: 'visitas'})
Fecha.belongsTo(Pelicula)
//
Estadistica.hasMany(Edad, {as: 'edad'})
Estadistica.hasMany(Genero, {as: 'genero'})
Estadistica.hasMany(Adquisicion, {as: 'adquisicion'})
Estadistica.hasMany(Tecnologia, {as: 'tecnologia'})

Edad.belongsTo(Estadistica)
Adquisicion.belongsTo(Estadistica)
Genero.belongsTo(Estadistica)
Tecnologia.belongsTo(Estadistica)


// routes
var books = require('./routes/books');
var peliculas = require('./routes/peliculas');
var fechas = require('./routes/fechas');
var estadisticas = require('./routes/estadisticas');
var paises = require('./routes/paises');

//Sync Database

models.sequelize.sync({force: true})
//models.sequelize.sync()


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
    .then(Fecha => {
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

  .then(() =>{
    Estadistica.bulkCreate(_ESTADISTICAS)
    .then(Estadistica => {
      console.log('ESTADISTICAS OK OK')
    })
    .catch(error => {
      console.log(error)
    })
  })

  .then(() =>{
    Edad.bulkCreate(_EDAD)
    .then(Edad => {
      console.log('EDAD OK OK')
    })
    .catch(error => {
      console.log(error)
    })
  })

  .then(() =>{
    Adquisicion.bulkCreate(_ADQUISICION)
    .then(Adquisicion => {
      console.log('Adquisicion OK OK')
    })
    .catch(error => {
      console.log(error)
    })
  })

  .then(() =>{
    Genero.bulkCreate(_GENERO)
    .then(Genero => {
      console.log('Genero OK OK')
    })
    .catch(error => {
      console.log(error)
    })
  })

  .then(() =>{
    Tecnologia.bulkCreate(_TECNOLOGIA)
    .then(Tecnologia => {
      console.log('Tecnologia OK OK')
    })
    .catch(error => {
      console.log(error)
    })
  })

  .then(() =>{
    Pais.bulkCreate(_PAIS)
    .then(Pais => {
      console.log('PAIS OKA')
    })
    .catch(error => {
      console.log(error)
    })
  })



  .catch(function (error) {
    console.log(error)
  })





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
app.use('/fechas', fechas);
app.use('/estadisticas', estadisticas);
app.use('/paises', paises);

// index path
app.get('/', function(req, res){
    console.log('app listening on port: '+port);
    res.send('cateando  express nodejs sqlite + fechas')
});

app.listen(port, function(){
    console.log('app listening on port: '+port);
});

module.exports = app;
