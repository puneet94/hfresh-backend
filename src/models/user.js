var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var UserSchema = new Schema({
  time: { type: Date, default: Date.now },
  userPhone: { type: Number },
  userName: { type: String },
  userEmail: { type: String },
  password: { type: String },
  passwordHash: { type: String },
  stores: [{ type: Schema.ObjectId, ref: "Store" }]
});

UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

UserSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      userId: this._id
    },
    process.env.JWT_USER_SECRET
  );
};

UserSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    userId: this._id,
    userToken: this.generateJWT()
  };
};

UserSchema.plugin(autoIncrement.plugin, { model: "User", field: "userAutoId" });
var User = mongoose.model("User", UserSchema);
exports.User = User;
