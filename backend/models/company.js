"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Activity = require("./activity");

var CompanySchema = new Schema({
  name: String,
  email: String,
  passwordHash: String,
  activities: [Activity],
});

module.exports = mongoose.model("Company", CompanySchema);
