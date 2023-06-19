const { DataTypes } = require("sequelize");
//const sequelize = require("../db.config");
//const DB = require("../db.config");

module.exports = (sequelize) => {
  const Has_member = sequelize.define(
    "Has_member",
    {
      Id_Has_member: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      Id_period: {
        type: DataTypes.INTEGER(255),
        //primaryKey: true,
        allowNull: true,
        unique: false,
      },

      Id_member: {
        type: DataTypes.STRING(255),
        //primaryKey: true,
        allowNull: true,
        unique: false,
      },
      Id_volet: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
        unique: false,
      },
    },

    { paranoid: true },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: true,
    }
  );

  return Has_member;
}; //
// Cocktail.sync()
//  Cocktail.sync({force: true})
//  Cocktail.sync({alter: true})
//module.exports = Cocktail;
