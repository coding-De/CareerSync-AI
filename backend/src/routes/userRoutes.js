const express = require("express");
const userControler = require("../controller/usercontroler");
const authmiddleware = require("../middlewares/auth.middleware");


const routes = express.Router();

routes.post("/resisters",userControler.resisteruserControler);
routes.post("/login",userControler.loginuserControler);
routes.post("/logout",userControler.logoutuserControler);
routes.post("/get-me",authmiddleware.authUser, userControler.getMeControler);

module.exports = routes;