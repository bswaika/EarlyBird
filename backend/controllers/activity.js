"use strict";

var mongoose = require("mongoose");
const Company = require("../models/company");
const { createTypeform, deleteTypeform } = require("../util/typeform");
const Activity = require("../models/activity").Activity;

// retrieve single user's profile with matching id
exports.getOne = async (req, res) => {
  try {
    // console.log(req);
    const activity = await Activity.findOne({ _id: req.params.activityId });
    res.status(200);
    return res.json(activity);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

// Create a new activity
exports.createActivity = async (req, res) => {
  let activityDoc = await Activity.create({
    type: req.body.type,
    name: req.body.name,
    description: req.body.description,
    points: req.body.points,
    deadline: req.body.deadline,
    company: req.params.companyId,
  });

  switch (req.body.type) {
    case "survey":
      // create webhook
      await createTypeform(req.body.form_id, activityDoc._id);
      break;
    case "social":
      // create activity
      break;
    default:
      // error
      break;
  }

  return res.json({ status: "success", activity: activityDoc });
};

exports.deleteActivity = async (req, res) => {
  let activityDoc = await Activity.findOne({ _id: req.params.activityId });
  await Activity.deleteOne({ _id: req.params.activityId });

  // Remove activity from company
  let companyDoc = await Company.findOne({ _id: activityDoc.company });
  let activities = companyDoc.activities.filter(
    (activity) => activity._id !== activityDoc._id
  );

  await Company.updateOne(
    { _id: activityDoc.company },
    { activities: activities }
  );

  switch (activityDoc.type) {
    case "survey":
      // delete webhook
      deleteTypeform(req.body.form_id);
      break;
    case "social":
      // delete activity
      break;
    default:
  }
  return res.json({ status: "success" });
};

// Update activity data based on webhook
exports.updateActivity = async (req, res) => {};

exports.deleteActivity = async (req, res) => {};
