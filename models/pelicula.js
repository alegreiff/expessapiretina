module.exports = function(sequelize, Sequalize) {
    var BookSchema = sequelize.define("Pelicula", {
      titulo: {
    type: Sequalize.STRING,
    allowNull: false
  },
  pais: {
    type: Sequalize.STRING,
    allowNull: false
  },
  year: {
    type: Sequalize.INTEGER,
      validate: {
        len: {
          args: [4, 4],
          msg: 'Cuatro caracteres exactos.'
        },
        isInt: {
          msg: "Must be an integer number of pennies"
        }
      }
  },
  duracion: Sequalize.INTEGER,
  genero: {
    type: Sequalize.ENUM('Documental', 'Ficción'),
    validate: {
        isIn: {
          args: [['Documental', 'Ficción']],
          msg: 'Género: debe ser Documental o Ficción'
        }
    }
  },
  formato: {
    type: Sequalize.ENUM('Largometraje', 'Cortometraje'),
      validate: {
        isIn: {
          args: [['Largometraje', 'Cortometraje']],
          msg: 'Formato: debe ser Largometraje o Cortometraje'
        }
    }
  }
    });
    return BookSchema;
}
