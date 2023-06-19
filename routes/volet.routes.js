const express = require("express");
const route = express.Router();
const voletsControllers = require("../controllers/volet.controllers");

/* differentes routes dans users */
route.use((req, res, next) => {
  const event = new Date().toString();
  console.log("User time : ", event);
  console.log(req.url, req.method);
  next();
});
route.get("", voletsControllers.getAllVolets);
route.get("/:id", voletsControllers.getOneVolet);
route.put("", voletsControllers.createVolet);
route.patch("/:id", voletsControllers.alterVolet);
route.delete("/:id", voletsControllers.deleteVolet);
//route.post("/restore/:id", usersControllers.restoreUser);

module.exports = route;
