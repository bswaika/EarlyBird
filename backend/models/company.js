"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Activity = require("./activity");

var CompanySchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  passwordHash: String,
  activities: [Activity],
});

module.exports = mongoose.model("Company", CompanySchema);
