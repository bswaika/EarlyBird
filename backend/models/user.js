"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Activity = require("./activity").ActivitySchema;
const Loyalty = require("./loyalty.js").LoyaltySchema;
const SpecialItem = require("./specialItem").SpecialItemSchema;

var UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  passwordHash: String,
  token: String,
  followingCompanies: [String],
  activities: [{ activity: Activity, status: String }],
  rewardPoints: Number,
  loyalties: [Loyalty],
});

module.exports = mongoose.model("User", UserSchema);
