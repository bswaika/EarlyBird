"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const SpecialItem = require("./specialItem").SpecialItemSchema;

var LoyaltySchema = new Schema({
  username: String,
  company: String,
  points: Number,
  specials: [{ item: SpecialItem, quantity: Number }],
});

module.exports.LoyaltySchema = LoyaltySchema;
module.exports.Loyalty = mongoose.model("Loyalty", LoyaltySchema);
