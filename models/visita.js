module.exports = function(sequelize, Sequalize) {
    var BookSchema = sequelize.define("Visita", {
        year: Sequalize.INTEGER,
        month: Sequalize.INTEGER,
        visitas: Sequalize.INTEGER
      });
      return BookSchema;
  }
