let express = require("express");
let UserController = require("../controllers/user");

let userRouter = express.Router();

userRouter.route("/login").post(UserController.login);
userRouter.route("/signup").post(UserController.signup);

module.exports = userRouter;
