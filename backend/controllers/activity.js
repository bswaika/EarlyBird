"use strict";

var mongoose = require("mongoose");
const Activity = require("../models/activity");

// retrieve single user's profile with matching id
exports.getOne = async (req, res) => {
  try {
    // console.log(req);
    const user = await Activity.findOne({ _id: req.params.id });
    res.status(200);
    return res.json(user);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

// Create a new activity
exports.createActivity = async (req, res) => {
  // detect type of activity
  // 1. survey
  // --> accept survey link, create webhook to survey
  // 2. social media
  // --> accept social media content/intent link
};

// Update activity data based on webhook
exports.updateActivity = async (req, res) => {};

exports.deleteActivity = async (req, res) => {};
