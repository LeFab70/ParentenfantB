const PRIVATEKEY = process.env.PRIVATEKEY;
const EXPIRESIN = process.env.EXPIRESIN;
const REFRESHTOKEN = process.env.REFRESHTOKEN;
//const bcrypt = require("bcrypt");
//on importe plutot lobjet db qui contient user model// require("../models/users.models");
const db = require("../db.config");
const userModel = db.User;
const jwt = require("jsonwebtoken");
const { AuthentificationError, MainError } = require("../errors/customsErrors");
// fonction qui genere les token
const generatetokenUser = (name) => {
  return jwt.sign(
    {
      user: name,
    },
    PRIVATEKEY,
    {
      expiresIn: EXPIRESIN, //temps d'expiration en seconde soit 30min ici
    }
  );
};
// fonction de regeneration du token
const refreshToken = (name) => {
  return jwt.sign({ user: name }, REFRESHTOKEN, {
    expiresIn: EXPIRESIN,
  });
};

exports.authentificate = async (req, res, next) => {
  try {
    const { pseudo, password } = req.body;
    if (!pseudo || !password)
      return res.status(400).json({ message: "Missing parameter" });

    const user = await userModel.findOne({
      
      where: { pseudo: pseudo },
      raw: true,
    });

    if (user === null)
      return res
        .status(404)
        .json({ message: "Invalid credential/user non trouvé" });

    //decoder et verifier si le  mot de passe de l'user corresponds
    //console.log(password, user.password)

    const validPass = await userModel.checkPassword(password, user.password);
    //await bcrypt.compare(password, user.password); // c'est une promesse

    if (!validPass)
      return res.status(401).json({ message: "Invalid credential" });
    // message si le mot de passe ne match pas

    // si tout est ok on genere le token et le refresh token pour l'utilisateur
    const tokenUser = generatetokenUser(user.name);
    const refreshtoken = refreshToken(user.name);
    // { algorithm: "RS256" }
    //console.log(refreshtoken)
    return res
      .status(200)
      .json({ user:user.name,access_token: tokenUser, refresh_token: refreshtoken });
  } catch (error) {
    next(error);
    // console.log(error);
    // if (error.name == "SequelizeDatabaseError")
    //   return res.status(500).json({ message: "internal error", error: error }); //{ message: "erreur du serveur", error: error.Tostring() }
    // return res.status(500).json({ message: "login process failed" });
  }
};

// await userModel
// .findOne({ where: { email: email }, raw: true })
// .then((user) => {
//   //verifier si l'user existe
//   if (user === null)
//     return res
//       .status(404)
//       .json({ message: "Invalid credential/user non trouvé" });

//decoder et verifier si le  mot de passe de l'user corresponds
//console.log(password, user.password)

//   bcrypt
//     .compare(password, user.password) // c'est une promesse
//     .then((validPass) => {
//       if (!validPass)
//         // message si le mot de passe ne match pas
//         return res.status(401).json({ message: "Invalid credential" });

//       // si tout est ok on genere le token et le refresh token pour l'utilisateur
//       const tokenUser = generatetokenUser(user.name);
//       const refreshtoken = refreshToken(user.name);
//       // { algorithm: "RS256" }
//       //console.log(refreshtoken)
//       res
//         .status(200)
//         .json({ access_token: tokenUser, refresh_token: refreshtoken });
//     })
//     .catch((err) =>
//       res.status(500).json({ message: "login process failed" })
//     );
// })
// .catch((err) =>
//   res.status(500).json({ message: "error in DB", error: err })
// );
// } catch (error) {
// console.log(error);
// res.status(500).json({ message: "internal error", error: error }); //{ message: "erreur du serveur", error: error.Tostring() }
// }
// };
