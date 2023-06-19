const { DataTypes } = require("sequelize");
//const sequelize = require("../db.config");
//const DB = require("../db.config");

module.exports = (sequelize) => {
  const Volet = sequelize.define(
    "Volet",
    {
      Id_volet: {
        type: DataTypes.INTEGER(255),
        primaryKey: true,
        autoIncrement: true,
      },

      label_volet: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: { msg: "le label du volet doit etre unique" },
        validate: {
          notNull: {
            msg: `fournir le label du volet`,
          },
        },
      },
      description_volet: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: `fournir le descriptif du volet`,
          },
        },
        // validate: {
        //   notNull: {
        //     msg: `fournir le nom de la personne A contacter en cas d'urgence`
        //   }
        // }
      },
    },

    { paranoid: true },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: true,
    }
  );

  return Volet;
}; //
// Cocktail.sync()
//  Cocktail.sync({force: true})
//  Cocktail.sync({alter: true})
//module.exports = Cocktail;
