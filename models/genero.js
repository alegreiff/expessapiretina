module.exports = function(sequelize, Sequalize) {
    var GeneroSchema = sequelize.define("Genero", {
        hombres: Sequalize.FLOAT,
        mujeres: Sequalize.FLOAT
      },{
        freezeTableName: true
    });
      return GeneroSchema;
  }
