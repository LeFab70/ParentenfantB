const express = require("express");
const route = express.Router();
const membersControllers = require("../controllers/member.controllers");

/* differentes routes dans users */
route.use((req, res, next) => {
  const event = new Date().toString();
  console.log("User time : ", event);
  console.log(req.url, req.method);
  next();
});
route.get("", membersControllers.getAllMembers);
//route.get("/:id", usersControllers.getOneUser);
route.put("", membersControllers.createMember);
//route.patch("/:id", usersControllers.alterUser);
route.delete("/:id", membersControllers.deleteMember);
//route.post("/restore/:id", usersControllers.restoreUser);

module.exports = route;
