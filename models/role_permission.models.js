const { DataTypes } = require("sequelize");
//const sequelize = require("../db.config");
//const DB = require("../db.config");

module.exports = (sequelize) => {
  const Role_permission = sequelize.define(
    "Role_permission",
    {
      Id_role: {
        type: DataTypes.INTEGER(255),
        primaryKey: true,
        //autoIncrement: true,
      },

      Id_permission: {
        type: DataTypes.INTEGER(255),
        primaryKey: true,
        // autoIncrement: true,
      },
    },

    { paranoid: true },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: true,
    }
  );

  return Role_permission;
}; //
// Cocktail.sync()
//  Cocktail.sync({force: true})
//  Cocktail.sync({alter: true})
//module.exports = Cocktail;
