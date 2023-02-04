"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SurveyScheme = new Schema({
  activityId: String,
  name: String,
  link: String,
});

module.exports = mongoose.model("Survey", SurveyScheme);
