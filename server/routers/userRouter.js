const express = require("express");
const logInUser = require("../controllers/userController/logInUser");
const createUser = require("../controllers/userController/createUser");
const logOutUser = require("../controllers/userController/logOutUser");
const withdrawUser = require("../controllers/userController/withdrawUser");
const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", logInUser);

// protected
userRouter.post("/signout", logOutUser);
userRouter.post("/:userId/withdraw", withdrawUser);

module.exports = userRouter;
