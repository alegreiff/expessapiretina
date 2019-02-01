module.exports = function(sequelize, Sequalize) {
    var TechSchema = sequelize.define("Tecnologia", {
        escritorio: Sequalize.FLOAT,
        movil: Sequalize.FLOAT,
        tablet: Sequalize.FLOAT
      },{
        freezeTableName: true
    });
      return TechSchema;
  }
