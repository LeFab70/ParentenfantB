const express = require("express");
const route = express.Router();
const usersControllers = require("../controllers/users.controllers");

/* differentes routes dans users */
route.use((req, res, next) => {
  const event = new Date().toString();
  console.log("User time : ", event);
  console.log(req.url, req.method);
  next();
});
route.get("", usersControllers.getAllUsers);
route.get("/:id", usersControllers.getOneUser);
route.put("", usersControllers.createUser);
route.patch("/:id", usersControllers.alterUser);
route.delete("/:id", usersControllers.deleteUser);
route.post("/restore/:id", usersControllers.restoreUser);

module.exports = route;
