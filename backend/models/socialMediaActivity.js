"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SocialMediaScheme = new Schema({
  activityId: String,
  name: String,
  actionLink: String,
  description: String,
  externalContent: String,
});

module.exports = mongoose.model("SocialMedia", SocialMediaScheme);
