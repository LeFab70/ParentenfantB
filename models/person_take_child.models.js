const { DataTypes } = require("sequelize");
//const sequelize = require("../db.config");
//const DB = require("../db.config");

module.exports = (sequelize) => {
  const Person_take_child = sequelize.define(
    "Person_take_child",
    {
      Id_person_take_child: {
        type: DataTypes.INTEGER(255),
        primaryKey: true,
        autoIncrement: true,
      },

      Id_member: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },

      fname: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `fournir le nom de la personne qui viendra prendre l'enfant`,
          },
          notEmpty: {
            msg: `fournir le nom de la personne qui viendra prendre l'enfant`,
          },
        },
      },
      lname: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `fournir le prenom de la personne qui viendra prendre l'enfant `,
          },
          notEmpty: {
            msg: `fournir le prenom de la personne qui viendra prendre l'enfant`,
          },
        },
      },
      phone: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `fournir le numero de la personne qui viendra prendre l'enfant`,
          },
          notEmpty: {
            msg: `fournir l'email de la personne qui viendra prendre l'enfant`,
          },
        },
      },
      lien_with_child: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `Quel est le lien avec la personne A contacter qui viendra prendre l'enfant`,
          },
        },
      },
    },

    { paranoid: true },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: true,
    }
  );

  return Person_take_child;
}; //
// Cocktail.sync()
//  Cocktail.sync({force: true})
//  Cocktail.sync({alter: true})
//module.exports = Cocktail;
