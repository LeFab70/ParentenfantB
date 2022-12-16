const { Sequelize } = require("sequelize");

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

//console.log(DB_HOST,);
// connexion à la base de données mysql
const sequelize = new Sequelize(
  //DB_HOST,
  DB_NAME,

  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: "mysql",
    port: DB_PORT,
    logging:  (...msg) => console.log(msg),
  }
);

//synchronisation de modeles

sequelize.sync((err) => {
  console.log("database non synchonisee", err);
});
// synchronisation generale,
// on aurait aussi pu le faire dans chaque modele correspondant
module.exports = sequelize;
