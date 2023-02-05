"use strict";

var mongoose = require("mongoose");
const User = require("../models/user");
const Activity = require("../models/activity").Activity;
const Loyalty = require("../models/loyalty").Loyalty;

// retrieve single user's profile with matching id
exports.getOne = async (req, res) => {
  try {
    // console.log(req);
    const user = await User.findOne({ _id: req.params.id });
    res.status(200);
    return res.json(user);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

exports.add = async (req, res) => {
  // VALIDATION
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201);
    return res.json(user);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

exports.update = async (req, res) => {
  try {
    // VALIDATION
    const user = await User.updateOne({ _id: req.params.id }, req.body);
    res.status(200);
    return res.json(user);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

exports.remove = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200);
    return res.json({ status: "success" });
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

exports.getAll = async function (req, res) {
  try {
    const users = await User.find();
    res.status(200);
    return res.json(users);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

// This should allow for someone to either add a new activity to their activities list or update their completion status
// This will also give them points for completing an activity
// Pass in {username: "username", activityId: "activityId", status: "status"}
exports.activityUpdate = async function (req, res) {
  // Get user doc
  let userDoc = await User.findOne(
    { username: req.body.username },
    function (err, user) {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    }
  );

  // Modify activity array
  let activityObject = await Activity.findOne({ _id: req.body.activityId });

  let newActivities = userDoc.activities
    .filter((x) => x.id != req.body.activityId)
    .push({ activity: activityObject, status: req.body.status });

  // Update user doc
  userDoc = await User.findOneAndUpdate(
    {
      username: req.body.username,
    },
    {
      activities: newActivities,
      $inc: { rewardPoints: activityObject.points },
    },
    { new: true },
    function (err, user) {}
  );

  if (req.body.status == "completed") {
    await Loyalty.findOneAndUpdate(
      {
        username: req.body.username,
        company: activityObject.company,
      },
      { $inc: { points: activityObject.points } }
    );
  }
};

exports.typeformWebhook = async (req, res) => {
  // check if webhook is valid
  // get user
  const username = req.body.form_response.definition.fields.filter(
    title === "username"
  )[0].value;
  const activityId = req.params.activityId;

  // update user activity
  this.activityUpdate({
    username: username,
    activityId: activityId,
    status: "completed",
  });

  // send response
  res.send(200);
};
