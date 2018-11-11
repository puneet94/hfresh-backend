var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
var relationship = require("mongoose-relationship");
autoIncrement.initialize(mongoose.connection);

var ScreenSchema = new Schema({
  time: { type: Date, default: Date.now },
  rid: { type: String },
  rurl: { type: String },
  store: { type: Schema.ObjectId, ref: "Store", childPath: "screens" },
  displays: [{ type: Schema.ObjectId, ref: "Display" }]
});

ScreenSchema.plugin(relationship, { relationshipPathName: "store" });
ScreenSchema.plugin(autoIncrement.plugin, {
  model: "Screen",
  field: "screenAutoId"
});
var Screen = mongoose.model("Screen", ScreenSchema);
exports.Screen = Screen;
