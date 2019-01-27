var express = require('express');
var Pelicula = require('../models').Pelicula;
var Fecha = require('../models').Fecha;
var Visita = require('../models').Visita;
var router = express.Router();


//RELACIONES ENTRE TABLAS
Pelicula.hasMany(Fecha, {as: 'temporadas'})
Pelicula.hasMany(Visita, {as: 'visitas'})


// middleware
var checkIDInput = function (req, res, next) {
    //console.log('Check ID input');
    if(isNaN(req.params.id)) {
        //console.log('Invalid ID supplied');
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkIDExist = function (req, res, next) {
    //console.log('Check ID exist');
    Pelicula.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            //console.log('Book not found');
            res.status(400).json('Puta vida. No está...');
        }
    });
};

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    Pelicula.findByPk(req.params.id).then(pelicula => {
        res.status(200).json(pelicula);
    });
});


router.get('/', function(req, res){
    Pelicula.findAll({
      attributes: ['id','titulo', 'pais', 'year', 'genero', 'formato', 'duracion'],
      include: [{
        model: Fecha, as: 'temporadas',
        attributes: ['entrada', 'salida']
      },
      {
        model: Visita, as: 'visitas',
        attributes: ['year', 'month', 'visitas']
      }
    ],
    }).then(peli => {
        res.status(200).json(peli);
    });
});

router.post('/', function(req, res){
    Pelicula.create({
      titulo: req.body.titulo,
      year: req.body.year,
      duracion: req.body.duracion,
      genero: req.body.genero,
      pais: req.body.pais,
      formato: req.body.formato
    }).then(pelicula => {
        res.status(200).json(pelicula);
    })
    .catch(error => {
      console.log(error)
      res.status(404).send(error.message)
    })
    .error(err => {
        console.log(error)
        res.status(405).json('Error has occured');
    });
});


/*

app.post('/pelicula', (req, res) => {
  Pelicula.create({
    titulo: req.body.titulo,
    year: req.body.year,
    duracion: req.body.duracion,
    genero: req.body.genero,
    formato: req.body.formato
  })
    .then(pelicula => {
      res.json(pelicula);
    })
    .catch(error => {
      console.log(error)
      res.status(404).send(error.message)
    })
});


*/



module.exports = router;
