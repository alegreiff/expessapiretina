module.exports = function(sequelize, Sequalize) {
    var Paischema = sequelize.define("Pais", {
        pais: Sequalize.STRING,
        sesiones: Sequalize.INTEGER,
        year: Sequalize.INTEGER,
        mes: Sequalize.INTEGER
      },{
        freezeTableName: true
    });
      return Paischema;
  }
