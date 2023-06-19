const { DataTypes } = require("sequelize");
//const sequelize = require("../db.config");
//const DB = require("../db.config");

module.exports = (sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      Id_role: {
        type: DataTypes.INTEGER(255),
        primaryKey: true,
        autoIncrement: true,
      },

      name_role: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `Quel le nom du role?`,
          },
        },
      },
      description_role: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `Quel la description du role?`,
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

  return Role;
}; //
// Cocktail.sync()
//  Cocktail.sync({force: true})
//  Cocktail.sync({alter: true})
//module.exports = Cocktail;
