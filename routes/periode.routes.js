const express = require("express");
const route = express.Router();
const periodsControllers = require("../controllers/periods.controllers");

/* differentes routes dans users */
route.use((req, res, next) => {
  const event = new Date().toString();
  console.log("User time : ", event);
  console.log(req.url, req.method);
  next();
});
route.get("", periodsControllers.getAllPeriods);
//route.get("/:id", voletsControllers.getOneVolet);
route.put("", periodsControllers.createPeriods);
route.patch("/:id", periodsControllers.alterPeriod);
route.delete("/:id", periodsControllers.deletePeriod);
//route.post("/restore/:id", usersControllers.restoreUser);

module.exports = route;
