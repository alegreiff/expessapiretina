var express = require('express');
var Estadistica = require('../models').Estadistica;
var Edad = require('../models').Edad;
var Adquisicion = require('../models').Adquisicion;
var Genero = require('../models').Genero;
var Tecnologia = require('../models').Tecnologia;
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../firebase.json");

const cors = require('cors')

const corsOptions = {
  origin: ['http://localhost:3006', 'dev.inforetinalatina.org']
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://estadisticasretina.firebaseio.com"
});


/*
admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    // ...
  }).catch(function(error) {
    // Handle error
  });

*/

/* req.headers.authorization */
var checkAUTH = function (req, res, next) {
  console.log(req.headers.authorization)
  let token = req.headers.authorization.split(' ')[1];
  admin.auth().verifyIdToken(token)
  .then(function(decodedToken) {
    //var uid = decodedToken.uid;
    next()
  }).catch(function(error) {
    res.status(400).json('NO AUTH FOR OLD MEN');
  });  
  
};


//router.get('/', [checkAUTH], function(req, res){
router.get('/', cors(corsOptions), function(req, res){
    Estadistica.findAll({
      attributes: ['id', 'mes', 'year', 'sesiones', 'kaltura', 'usuarios_analytics','duracion_media','rebote','nuevas_sesiones','usuarios_wp','visitas_paginas'],
      include: [{
        model: Edad, as: 'edad',
        attributes: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6']
      },
      {
        model: Adquisicion, as: 'adquisicion',
        attributes: ['directa', 'social', 'organica', 'referida']
      },
      {
        model: Genero, as: 'genero',
        attributes: ['hombres', 'mujeres']
      },
      {
        model: Tecnologia, as: 'tecnologia',
        attributes: ['escritorio', 'movil', 'tablet']
      }
    ],
  }).then(estadistica => {
        res.status(200).json(estadistica);
    });
});



router.post('/', function(req, res){
  console.log(req)
    Estadistica.create({
      mes: req.body.mes,
      year: req.body.year,
      sesiones: req.body.sesiones,
      usuarios_analytics: req.body.usuarios_analytics,
      duracion_media: req.body.duracion_media,
      rebote: req.body.rebote,
      nuevas_sesiones: req.body.nuevas_sesiones,
      usuarios_wp: req.body.usuarios_wp,
      visitas_paginas: req.body.visitas_paginas,
      adquisicion: {
        directa: req.body.adquisicion[0].directa,
        social: req.body.adquisicion[0].social,
        organica: req.body.adquisicion[0].organica,
        referida: req.body.adquisicion[0].referida
      },
      tecnologia:
      {
        escritorio: req.body.tecnologia[0].escritorio,
        movil: req.body.tecnologia[0].movil,
        tablet: req.body.tecnologia[0].tablet
      },
      genero:
      {
        hombres: req.body.genero[0].hombres,
        mujeres: req.body.genero[0].mujeres
      },
      edad:
      {
        g1: req.body.edad[0].g1,
        g2: req.body.edad[0].g2,
        g3: req.body.edad[0].g3,
        g4: req.body.edad[0].g4,
        g5: req.body.edad[0].g5,
        g6: req.body.edad[0].g6

      }},{include: [{
        model: Edad,
        as: 'edad'
      },
      {
        model: Genero,
        as: 'genero'
      },
      {
        model: Adquisicion,
        as: 'adquisicion'
      },
      {
        model: Tecnologia,
        as: 'tecnologia'
      }]
    }).then(estadistica => {
        res.status(200).json(estadistica);
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


module.exports = router;
