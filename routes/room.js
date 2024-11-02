const express = require("express");
const route = express.Router();
const { create, list, read, update, remove } = require("../controllers/room");
const { checkAuthen, checkRole } = require("../middlewares/auth");

route.post("/room", create);
route.get("/room", list);
route.get("/room/:id", read);
route.put("/room/:id", checkAuthen, checkRole, update);
route.delete("/room/:id", remove);

module.exports = route;
