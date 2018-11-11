"use strict";

var Screen = require("..//models/screen").Screen;
var User = require("..//models/user").User;
var ScreenItem = require("..//models/screenItem").ScreenItem;

const createScreen = async (req, res) => {
  var screen = new Screen();

  screen.rid = req.body.screen.rid;
  screen.rurl = req.body.screen.rurl;
  screen.storeId = req.body.screen.storeId;
  try {
    let screenSaved = await screen.save();

    res.json(screenSaved);
  } catch (e) {
    console.log("error in save screen and user");
    console.log(e);
  }
};
const updateScreen = async (req, res) => {
  try {
    let screen = await Screen.findById(req.params.screenId);
    screen.state = req.body.type;
    let updatedScreen = await screen.save();
    res.json(updatedScreen);
  } catch (e) {
    console.log("update screen error");
    console.log(e);
  }
};
function getScreens(req, res) {
  var query = {};

  query.storeId = req.params.storeId;

  var options = {};

  options.sort = "-time";

  Screen.find(query, null, options).then(screens => {
    res.json(screens);
  });
}
function deleteScreen(req, res) {
  Screen.findById(req.params.screenId, function(err, screen) {
    if (err) {
      console.log(err);
    }
    if (screen) {
      screen.remove(function(err, removed) {
        if (err) {
          console.log("line 71");
          console.log(err);
        }
        if (removed) {
          res.json({ message: "Screen has been deleted" });
        }
      });
    }
  });
}
function getScreen(req, res) {
  Screen.findById(req.params.screenId, function(err, screen) {
    if (err) {
      console.log(err);
    }
    if (screen) {
      res.json({ screen: screen });
    }
  });
}
var screenController = {
  createScreen: createScreen,
  getScreen: getScreen,
  deleteScreen: deleteScreen,
  getScreens,
  updateScreen
};

module.exports = screenController;
