"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SpecialItemSchema = new Schema({
  company: String,
  requiredPoints: Number,
  description: String,
  exchangeRate: Number,
  fungible: Boolean,
  image: String,
  name: String,
  uid: String, // Can be used as promo code
});

module.exports.SpecialItemSchema = SpecialItemSchema;
module.exports.SpecialItem = mongoose.model("SpecialItem", SpecialItemSchema);
