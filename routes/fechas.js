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
    Fecha.findAll().then(fecha => {
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
