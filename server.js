const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
express_enforces_ssl = require("express-enforces-ssl");
//const dotenv = require("dotenv");
const dbConnection = require("./db.config");
//dotenv.config({ path: "/.env", encoding: "latin1", debug: true });
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const PRIVATEKEY = process.env.PRIVATEKEY;
const server = express();
const checkToken = require("./middlewares/checktoken");
console.log(PORT);
server.use(morgan("combined"));
server.use(helmet());
server.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
//server.use(express_enforces_ssl());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//importation des routes et connexion avec le serveur

const userRoutes = require("./routes/users.routes");
//const cocktailRoutes = require("./routes/cocktails.routes");
const authRoutes = require("./routes/auth.routes");
const roleRoutes = require("./routes/role.routes");
const handlerError = require("./errors/handlerError");
const membersRoutes = require("./routes/member.routes");
const voletsRoutes = require("./routes/volet.routes");
const periodsRoutes = require("./routes/periode.routes");
const hasMemberRoutes = require("./routes/hasMembers.Routes");
server.use("/users", userRoutes);
server.use("/membres", membersRoutes);
server.use("/volets", voletsRoutes);
server.use("/roles", roleRoutes);
server.use("/periode", periodsRoutes);
server.use("/hasMember", hasMemberRoutes);
//server.use("/cocktail", cocktailRoutes);
server.use("/login", authRoutes);
server.get("/", (req, res) => {
  res.status(200).send("Welcome to your server");
});

//gestion centralisee des erreurs
server.use(handlerError);

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
dbConnection.sequelize
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
