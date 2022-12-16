const { DataTypes } = require("sequelize");
const DB = require("../db.config");

const User = DB.define(
  "User",
  {
    Id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "",
      validate: {
        notNull: {
          msg: "Please enter your name",
        },
      },
    },
    pseudo: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      defaultValue: "",
      validate: {
        notNull: {
          msg: "Please enter your pseudo",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: {
          msg: "Please enter your email",
        },
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    //   validate: {
    //     is: /^[0-9a-f]{64}$/i,
    //    // notNull: {
    //      // msg: "Please enter your password",
    //     //}, //le mot de passe doit comprendre les chifre et lettre sur 64 caract max
    //   },
    },
  },
  { paranoid: true } // pour gerer les suppressions de données en database --permet de les stocker dans une tampon
);

// User.sync()
// User.sync({force: true})
// User.sync({alter: true})

module.exports = User;
