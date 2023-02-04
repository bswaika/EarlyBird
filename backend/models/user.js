"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Activity = require("./activity");
const Loyalty = require("./loyalty");

var UserSchema = new Schema({
  username: String,
  name: String,
  email: String,
  passwordHash: String,
  followingCompanies: [String],
  activities: [{ activity: Activity, status: String }],
  rewardPoints: Number,
  loyalties: [Loyalty],
});

module.exports = mongoose.model("User", UserSchema);
