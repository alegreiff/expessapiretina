module.exports = function(sequelize, Sequalize) {
    var EstadSchema = sequelize.define("Estadistica", {
        mes: Sequalize.INTEGER,
        year: Sequalize.INTEGER,
        sesiones: Sequalize.INTEGER,
        usuarios_analytics: Sequalize.INTEGER,
        duracion_media: Sequalize.INTEGER,
        rebote: Sequalize.DECIMAL(10,2),
        nuevas_sesiones: Sequalize.FLOAT,
        usuarios_wp: Sequalize.INTEGER,
        visitas_paginas: Sequalize.INTEGER
      });
      return EstadSchema;
  }
