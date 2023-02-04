"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  name: String,
  company: String,
  description: String,
  points: Number,
  deadline: String,
  type: String,
});

module.exports = mongoose.model("Activity", ActivitySchema);
