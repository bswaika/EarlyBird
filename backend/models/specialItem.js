"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SpecialItemSchema = new Schema({
  company: String,
  requiredPoints: Number,
  description: String,
  exchangeRate: Number,
  fungible: Boolean,
});

module.exports = mongoose.model("SpecialItem", SpecialItemSchema);
