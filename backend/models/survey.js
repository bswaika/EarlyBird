"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Question = new Schema({
  question: String,
  type: String,
  options: [String],
});

var SurveyScheme = new Schema({
  activityId: String,
  name: String,
  actionLink: String,
  questions: [Question],
});

module.exports = mongoose.model("Survey", SurveyScheme);
