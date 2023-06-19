const { DataTypes } = require("sequelize");
//const sequelize = require("../db.config");
//const DB = require("../db.config");

module.exports = (sequelize) => {
  const Permission = sequelize.define(
    "Permission",
    {
      Id_permission: {
        type: DataTypes.INTEGER(255),
        primaryKey: true,
        autoIncrement: true,
      },

      name_permission: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `Quel le nom de la Permission?`,
          },
        },
      },
      description_permission: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `Quel la description de la Permission?`,
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

  return Permission;
}; //
// Cocktail.sync()
//  Cocktail.sync({force: true})
//  Cocktail.sync({alter: true})
//module.exports = Cocktail;
