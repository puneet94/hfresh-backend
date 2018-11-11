"use strict";
var express = require("express");
var authenticate = require("../middlewares/userAuthenticate");

var ScreenController = require("../controllers/screen");
var screenRouter = express.Router();

screenRouter.route("/create").post(authenticate, ScreenController.createScreen);
screenRouter
  .route("/delete/:screenId")
  .post(authenticate, ScreenController.deleteScreen);
screenRouter
  .route("/get/:screenId")
  .get(authenticate, ScreenController.getScreen);
screenRouter
  .route("/update/:screenId")
  .post(authenticate, ScreenController.updateScreen);
screenRouter
  .route("/getScreens/:storeId")
  .get(authenticate, ScreenController.getScreens);

module.exports = screenRouter;
