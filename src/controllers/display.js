"use strict";

var Display = require("..//models/display").Display;
var User = require("..//models/user").User;
var DisplayItem = require("..//models/displayItem").DisplayItem;

const createDisplay = async (req, res) => {
  var display = new Display();

  let items = req.body.display.items;
  let price = req.body.display.price;
  let currency = req.body.display.currency;

  display.notes = req.body.display.user.userNotes;

  display.table = req.body.display.user.userTable;
  display.user = req.body.display.user.userId;
  display.state = "Received";
  display.content = req.body.content;

  display.price = price;
  display.currency = currency;
  try {
    //let savedUser = await user.save();

    let displaySaved = await display.save();
    for (let i = 0; i < items.length; i++) {
      await saveDisplayItem(items[i], displaySaved._id);
    }
    let finalDisplay = await Display.findById(displaySaved._id).populate([
      {
        path: "displayItems",
        model: "DisplayItem",
        populate: {
          path: "item",
          model: "Item"
        }
      },
      { path: "user", model: "User" }
    ]);
    res.json(finalDisplay);
  } catch (e) {
    console.log("error in save display and user");
    console.log(e);
  }
};
const updateDisplay = async (req, res) => {
  try {
    let display = await Display.findById(req.params.displayId);
    display.state = req.body.type;
    let updatedDisplay = await display.save();
    res.json(updatedDisplay);
  } catch (e) {
    console.log("update display error");
    console.log(e);
  }
};
const saveDisplayItem = async (item, display) => {
  var displayItem = new DisplayItem();
  displayItem.item = item._id;
  displayItem.quantity = item.quantity;
  displayItem.price = item.price;
  displayItem.display = display;
  try {
    await displayItem.save();
  } catch (e) {
    console.log("error in saving display item");
    console.log(e);
  }
};
function getDisplays(req, res) {
  var query = {};

  if (req.query.type != "All") {
    query.state = req.query.type;
  }
  var options = {};

  options.sort = "-time";
  options.populate = [
    {
      path: "displayItems",
      model: "DisplayItem",
      populate: {
        path: "item",
        model: "Item"
      }
    },
    { path: "user", model: "User" }
  ];
  Display.find(query, null, options).then(displays => {
    res.json(displays);
  });
}
function deleteDisplay(req, res) {
  Display.findById(req.params.displayId, function(err, display) {
    if (err) {
      console.log(err);
    }
    if (display) {
      display.remove(function(err, removed) {
        if (err) {
          console.log("line 71");
          console.log(err);
        }
        if (removed) {
          res.json({ message: "Display has been deleted" });
        }
      });
    }
  });
}
function getDisplay(req, res) {
  Display.findById(req.params.displayId, function(err, display) {
    if (err) {
      console.log(err);
    }
    if (display) {
      res.json({ display: display });
    }
  });
}
var displayController = {
  createDisplay: createDisplay,
  getDisplay: getDisplay,
  deleteDisplay: deleteDisplay,
  getDisplays,
  updateDisplay
};

module.exports = displayController;
