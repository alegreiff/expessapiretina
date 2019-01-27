var express = require('express');
var Fecha = require('../models').Fecha;
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
            res.status(400).json('Book not found');
        }
    });
};

router.get('/', function(req, res){
    Pelicula.findAll().then(peli => {
        res.status(200).json(peli);
    });
});



module.exports = router;
