const { DataTypes } = require("sequelize");
//const sequelize = require("../db.config");
//const DB = require("../db.config");

module.exports = (sequelize) => {
  const Period = sequelize.define(
    "Period",
    {
      Id_period: {
        type: DataTypes.INTEGER(255),
        primaryKey: true,
        autoIncrement: true,
      },

      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        isDate: true,

        // validate: {
        //   notNull: {
        //     msg: `fournir la date de debut`,
        //   },
        //   customValidator(value) {
        //     if (new Date(value) < new Date()) {
        //       throw new Error("invalid date");
        //     }
        //   },
        //},
      },

      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        isDate: true,

        // validate: {
        //   isDate: "la valeur attendue est une date",
        //   notNull: {
        //     msg: `fournir la date de fin`,
        //   },
        // },
      },

      close: {
        type: DataTypes.STRING(10),
        ///allowNull: false,
        default: "non",
        // validate: {
        //   isIn: {
        //     args: [["oui", "non"]],
        //     msg: "la valeur de cloture de la periode doit-etre oui ou non",
        //   },
        //   notNull: {
        //     msg: `la valeur de cloture de la periode doit-etre oui ou non`,
        //   },
        // },
      },
    },

    { paranoid: true },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: true,
    }
  );

  return Period;
}; //
// Cocktail.sync()
//  Cocktail.sync({force: true})
//  Cocktail.sync({alter: true})
//module.exports = Cocktail;
