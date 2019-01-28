var express = require('express');
var Fecha = require('../models').Fecha;
var Pelicula = require('../models').Pelicula;
var router = express.Router();
const { Op } = require('sequelize')
var moment = require('moment');

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

var checkDATEInput = function (req, res, next) {
    var m = moment(req.body.salida, 'YYYY-MM-DD');
    var verificafecha = m.isValid()
    if(!verificafecha) {
        res.status(400).json('El formato de la fecha debe ser YYYY-MM-DD');
    } else {
        next();
    }
};


var checkIDExist = function (req, res, next) {
    //console.log('Check ID exist');
    Fecha.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            //console.log('Book not found');
            res.status(400).json('Fecha no hallada');
        }
    });
};

router.get('/', function(req, res){
    Fecha.findAll({
      attributes: ['PeliculaId','entrada', 'salida'],
    }).then(fecha => {
        res.status(200).json(fecha);
    });
});

/*
router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    //console.log('Update book by id');
    Book.update({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

*/


router.put('/:id', [checkIDInput, checkIDExist, checkDATEInput], function(req, res){
  Fecha.update({
    salida: req.body.salida
  }, {where: {id: req.params.id} })
  .then(result => {
      res.status(200).json(result);
  })
      .catch(error =>{
        console.log(error)
        res.status(404).send(error)
      })
})

router.get('/proximas', function(req, res){
    Fecha.findAll({
      attributes: ['PeliculaId','entrada', 'salida'],
      where: {
        salida: {
          [Op.gte]: moment().subtract(1, 'days').toDate()
        },
      },
      include: [{
        model: Pelicula,
        attributes: ['titulo']
      }]
    }).then(fecha => {
        res.status(200).json(fecha);
    });
});

router.get('/proximas', function(req, res){
    Fecha.findAll({
      attributes: ['PeliculaId','entrada', 'salida'],
      where: {
        salida: {
          [Op.gte]: moment().subtract(1, 'days').toDate()
        },
      },
      include: [{
        model: Pelicula,
        attributes: ['titulo']
      }]
    }).then(fecha => {
        res.status(200).json(fecha);
    });
});






module.exports = router;
