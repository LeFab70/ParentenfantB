const { DataTypes } =require ("sequelize");
const DB = require("../db.config");

const Cocktail = DB.define(
  "Cocktail",

  {
    Id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    IdUser: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "",
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    recette: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
  },
  { paranoid: true }
);

// Cocktail.sync()
//  Cocktail.sync({force: true})
//  Cocktail.sync({alter: true})
module.exports = Cocktail;
