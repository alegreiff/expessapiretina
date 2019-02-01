module.exports = function(sequelize, Sequalize) {
    var EdadSchema = sequelize.define("Edad", {
        g1: Sequalize.FLOAT,
        g2: Sequalize.FLOAT,
        g3: Sequalize.FLOAT,
        g4: Sequalize.FLOAT,
        g5: Sequalize.FLOAT,
        g6: Sequalize.FLOAT

      },{
        freezeTableName: true
    });
      return EdadSchema;
  }
