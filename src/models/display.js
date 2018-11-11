let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let model = mongoose.model;
let connection = mongoose.connection;

let autoIncrement = require("mongoose-auto-increment");
let relationship = require("mongoose-relationship");

autoIncrement.initialize(connection);

var DisplaySchema = new Schema({
  time: { type: Date, default: Date.now },
  screen: { type: Schema.ObjectId, ref: "Screen", childPath: "displays" }
});

DisplaySchema.plugin(relationship, { relationshipPathName: "screen" });
DisplaySchema.plugin(autoIncrement.plugin, {
  model: "Display",
  field: "displayAutoId"
});
var Display = model("Display", DisplaySchema);
exports.Display = Display;
