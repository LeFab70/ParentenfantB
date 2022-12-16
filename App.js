const express = require("express");
const dotenv = require("dotenv");

const jwt = require("jsonwebtoken");
dotenv.config({ path: "./config/.env", encoding: "latin1", debug: true });
//const bodyParser = require("body-parser");// plus necessaire
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const PRIVATEKEY = process.env.PRIVATEKEY;
const PUBLICKEY = process.env.PUBLICKEY;
const REFRESHTOKEN = process.env.REFRESHTOKEN;
const server = express();
const users = [
  {
    id: 1,
    name: "lefab",
    password: "123456",
    email: "fab@gmail.com",
    isAdmin: true,
    role: [],
  },
];

// fonction qui genere les token
const generatetokenUser = (name) => {
  return jwt.sign(
    {
      user: name,
    },
    PRIVATEKEY,
    {
      expiresIn: "1800s", //temps d'expiration en seconde soit 30min ici
    }
  );
};
// d=fonction de regeneration du token
const refreshToken = (name) => {
  return jwt.sign({ user: name }, REFRESHTOKEN, {
    expiresIn: "1h",
  });
};
//server.use(bodyParser.json()); est remplacée par express.json()
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// creation du middelware d'authentification pour donner acces aux routes
const checkToken = (req, res, next) => {
  const tokenToCkeck = req.headers.authorization;
  //verifier si le token est null
  if (!tokenToCkeck) {
    res.status(401).send("Invalid credential/non autorisé connectez-vous!!!");
    return;
  }

  //jwt.verify(tokenToCkeck, PUBLICKEY, (err, decoded) => {
  jwt.verify(tokenToCkeck, PRIVATEKEY, (err, decoded) => {
    if (err) res.status(401).send("Invalid credential/non autorisé");
    else {
      req.userToken = decoded;
      next();
    }
  });
};

//route de mise a jour du token
server.get("/refreshtoken", (req, res) => {
  const tokenToCkeck = req.headers.authorization;
  //verifier si le token est null
  if (!tokenToCkeck) {
    res.status(401).send("Invalid credential/non autorisé connectez-vous!!!");
    return;
  }
  jwt.verify(tokenToCkeck, REFRESHTOKEN, (err, decoded) => {
    if (err) res.status(401).send("Invalid credential/non autorisé");
    else {
      //ici tester si user est dans la bd

      // annuler les precedentes info sur le token notament le iat et le exp
      delete decoded.iat;
      delete decoded.exp;
      const refreshedToken = generatetokenUser(decoded);
      res.status(200).send({ accesToken: refreshedToken });
    }
  });
});

// checker si user authentififier grace au middelware
server.get("/", checkToken, (req, res) => {
  res.status(200).send(req.userToken);
});

//authentification de l'utilisateur et envoie du token dans la key private
server.post("/login", (req, res) => {
  try {
    const { name, password } = req.body;
    const valid = users.some(
      (user) => user.name === name && user.password === password
    );

    if (!valid) {
      res.status(404).send("Invalid credential/user non trouvé");
      return;
    }
    const tokenUser = generatetokenUser(name);
    const refreshtoken = refreshToken(name);
    // { algorithm: "RS256" }
    //console.log(refreshtoken)
    res.status(200).send({ tokenUser, refreshtoken });
  } catch (error) {
    console.log(error);
    res.status(500).send(error); //{ message: "erreur du serveur", error: error.Tostring() }
  }
});

server.listen(PORT, () => {
  console.log(`serveur connecté au port ${PORT} sur http://${HOST}:${PORT}`);
});
