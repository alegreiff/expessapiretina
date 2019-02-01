module.exports = function(sequelize, Sequalize) {
    var TechSchema = sequelize.define("Tecnologia", {
        escritorio: Sequalize.INTEGER,
        movil: Sequalize.INTEGER,
        tablet: Sequalize.INTEGER
      },{
        freezeTableName: true
    });
      return TechSchema;
  }
