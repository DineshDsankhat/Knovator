const express = require("express");
const userRouter = express.Router();
const userControll = require("../controllers/userController.js");

userRouter.get("/", userControll.getHomePage);

// registration and login api
userRouter.post("/register", userControll.register);
userRouter.post("/authenticate", userControll.authenticate);


exports.route = userRouter;
