"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  passwordHash: String,
  token: String
});

module.exports = mongoose.model("User", UserSchema);
