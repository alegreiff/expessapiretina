module.exports = function(sequelize, Sequalize) {
    var EdadSchema = sequelize.define("Edad", {
        g1: Sequalize.INTEGER,
        g2: Sequalize.INTEGER,
        g3: Sequalize.INTEGER,
        g4: Sequalize.INTEGER,
        g5: Sequalize.INTEGER,
        g6: Sequalize.INTEGER

      },{
        freezeTableName: true
    });
      return EdadSchema;
  }
