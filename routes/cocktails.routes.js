const express = require("express");
const route = express.Router();
const cocktailControllers = require("../controllers/cocktails.controllers");

/* differentes routes dans users */

//route.get("", usersControllers.getAllUser);
route.get("/:id", cocktailControllers.getOneCocktail);
// route.post("", usersControllers.createUser);
// route.patch("/:id", usersControllers.alterUser);
// route.delete("/:id", usersControllers.deleteUser);
// route.post("restore/:id", usersControllers.restoreUser);

module.exports = route;
