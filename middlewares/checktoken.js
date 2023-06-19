const PRIVATEKEY = process.env.PRIVATEKEY;
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let tokenToCheck = req.headers.authorization; //.split(" ")[1];

  //console.log(tokenToCheck)
  
  //verifier si le token est null
  if (!tokenToCheck)
    return res
      .status(401)
      .json({ message: "Invalid credential/non autorisé connectez-vous!!!" });

  // cest quand le token est disponible quon decoupe
  tokenToCheck = tokenToCheck.split(" ")[1];
  //jwt.verify(tokenToCkeck, PUBLICKEY, (err, decoded) => {
  jwt.verify(tokenToCheck, PRIVATEKEY, (err, decoded) => {
    if (err)
      res.status(401).json({ message: "Invalid credential/non autorisé" });
    else {
      req.userToken = decoded;
      next(); // va vers les routes suivantes si le token est bon
    }
  });
};

module.exports = checkToken;
