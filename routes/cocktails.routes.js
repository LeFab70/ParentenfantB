// const express = require("express");
// const route = express.Router();
// const cocktailControllers = require("../controllers/cocktails.controllers");
// const checkToken = require("../middlewares/checktoken");
// /* differentes routes dans users */

// /*** Middleware pour logger dates de requete */
// route.use((req, res, next) => {
//   const event = new Date();
//   console.log("Cocktail Time:", event.toString());
//   next();
// });
// route.get("", cocktailControllers.getAllCocktails);
// route.get("/:id", cocktailControllers.getOneCocktail);
// route.put("", checkToken, cocktailControllers.createCocktail);
// route.patch("/:id", checkToken, cocktailControllers.alterCocktail);
// route.delete("/:id",checkToken, cocktailControllers.deleteCocktail);
// route.post("/restore/:id", checkToken, cocktailControllers.restoreCocktail);

// module.exports = route;
