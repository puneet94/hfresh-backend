var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

var StoreSchema = new Schema({
  time: { type: Date, default: Date.now },
  name: { type: String },
  state: { type: String },
  country: { type: String },
  suburb: { type: String },
  street: { type: String },
  address: { type: String },
  pincode: { type: String },
  screens: [{ type: Schema.ObjectId, ref: "Screen" }]
});

StoreSchema.plugin(autoIncrement.plugin, {
  model: "Store",
  field: "storeAutoId"
});
var Store = mongoose.model("Store", StoreSchema);
exports.Store = Store;
