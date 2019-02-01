module.exports = function(sequelize, Sequalize) {
    var GeneroSchema = sequelize.define("Genero", {
        hombres: Sequalize.INTEGER,
        mujeres: Sequalize.INTEGER
      },{
        freezeTableName: true
    });
      return GeneroSchema;
  }
