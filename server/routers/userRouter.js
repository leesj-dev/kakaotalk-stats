const express = require("express");
const loginUser = require("../controllers/userController/logInUser");
const createUser = require("../controllers/userController/createUser");
const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
