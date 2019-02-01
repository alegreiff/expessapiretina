module.exports = function(sequelize, Sequalize) {
    var AdquiSchema = sequelize.define("Adquisicion", {
        directa: Sequalize.INTEGER,
        organica: Sequalize.INTEGER,
        social: Sequalize.INTEGER,
        referida: Sequalize.INTEGER
      },{
        freezeTableName: true
    });
      return AdquiSchema;
  }
