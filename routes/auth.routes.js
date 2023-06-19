const express = require("express");
const route = express.Router();
const auth = require("../controllers/auth");

//middleware generaliste de gestion des log sur auth
// possiblites de le repliquer sur toutes les autres routes
// aussi, la req peut etre decomposer pour avoir les
/* les url
     les routes utilisees
      */
route.use((req, res, next) => {
  const event = new Date().toString();
  console.log("Auth time : ", event);
  //console.log(req)
  next();
});

route.post("", auth.authentificate);

module.exports = route;
