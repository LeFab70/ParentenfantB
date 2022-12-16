const express = require("express");
const cors = require("cors");
//const dotenv = require("dotenv");
const dbConnection = require("./db.config");
//dotenv.config({ path: "./config/.env", encoding: "latin1", debug: true });
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const PRIVATEKEY = process.env.PRIVATEKEY;
const server = express();

//console.log(PORT)
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//importation des routes et connexion avec le serveur

const userRoutes = require("./routes/users.routes");
const cocktailRoutes = require("./routes/cocktails.routes");

server.use("/users", userRoutes);
server.use("/cocktail", cocktailRoutes);

server.get("/", (req, res) => {
  res.status(200).send("Welcome to your server");
});

//tout autre chemin apres le port de connexion renvoie le message erreur 501
server.get("*", (req, res) => {
  res.status(501).send("Chemin non defini / Merci de vérifier votre URL");
  res.end();
});

//console.log(dbConnection);
/*connexion à la bd et au server express; si la bd nes pas fonctionnel pas besoin de 
demarrer le server express,authentificate est une methode asynchrone donc possibilité de faire
des then et catch
*/
dbConnection
  .authenticate()
  .then(() =>
    console.log("Connection to DB has been established successfully.")
  )
  .then(() => {
    server.listen(PORT, () => {
      console.log(
        `serveur connecté au port ${PORT} sur http://${HOST}:${PORT}`
      );
    });
  })
  .catch((error) => console.error("Unable to connect to the database:", error));
