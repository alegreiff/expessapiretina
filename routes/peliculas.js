var express = require('express');
var Pelicula = require('../models').Pelicula;
var Fecha = require('../models').Fecha;
var Visita = require('../models').Visita;
var router = express.Router();


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
            res.status(400).json('JAJAJA No existe película con dicho ID. ERROR');
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
        attributes: ['entrada', 'salida', 'id']
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


router.put('/:id', (req, res) => {
  Pelicula.update({
    titulo: req.body.titulo,
  }, {where: {id: req.params.id} })
      .then(rows => {
        res.json({
          message: 'Modificado'
        })
      })
      .catch(error =>{
        console.log(error)
        res.status(404).send(error)
      })
})
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000'
}
router.post('/', cors(corsOptions), function(req, res){
  console.log(req)
    Pelicula.create({
      titulo: req.body.titulo,
      year: req.body.year,
      duracion: req.body.duracion,
      genero: req.body.genero,
      pais: req.body.pais,
      formato: req.body.formato,
      temporadas:
      {
        entrada: req.body.temporadas[0].entrada,
        salida: req.body.temporadas[0].salida
      }},{include: [{
        model: Fecha,
        as: 'temporadas'
      }]
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
{
	"titulo":	"Pollos locos",
	"year":	2016,
	"duracion":	25,
	"genero":	"Documental",
	"formato":	"Cortometraje",
	"pais":	"Perú",
	"temporadas": [{
		"entrada": "2019-01-23",
		"salida" :	"2019-02-28"
	}]
}
*/
/*
Product.create({
  id: 1,
  title: 'Chair',
  categories: [
    {id: 1, name: 'Alpha'},
    {id: 2, name: 'Beta'}
  ]
}, {
  include: [{
    model: Categories,
    as: 'categories'
  }]
})
*/


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
