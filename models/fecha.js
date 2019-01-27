module.exports = function(sequelize, Sequalize) {
    var BookSchema = sequelize.define("Fecha", {
      entrada: Sequalize.DATEONLY,
      salida: Sequalize.DATEONLY
      });
      return BookSchema;
  }
