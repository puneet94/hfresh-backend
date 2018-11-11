"use strict";
var express = require("express");
var authenticate = require("../middlewares/userAuthenticate");

var StoreController = require("../controllers/store");
var storeRouter = express.Router();

storeRouter.route("/create").post(authenticate, StoreController.createStore);
storeRouter
  .route("/delete/:storeId")
  .post(authenticate, StoreController.deleteStore);
storeRouter.route("/get/:storeId").get(authenticate, StoreController.getStore);
storeRouter
  .route("/update/:storeId")
  .post(authenticate, StoreController.updateStore);
storeRouter
  .route("/getStores/:userId")
  .get(authenticate, StoreController.getStores);

module.exports = storeRouter;
