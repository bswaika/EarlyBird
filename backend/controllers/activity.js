"use strict";

var mongoose = require("mongoose");
const Activity = require("../models/activity").Activity;

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
  switch (req.body.type) {
    case "survey":
      // create webhook
      await Activity.create({
        type: "survey",
        surveyLink: req.body.surveyLink,
        webhook: req.body.webhook,
        company: req.body.company,
        user: req.body.user,
      });

      await fetch(
        `https://api.typeform.com/forms/${
          req.body.form_id
        }/webhooks/${"earlyByrd"}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + process.env.TYPEFORM_TOKEN,
          },
          body: JSON.stringify({
            url: "https://localhost:3001/api/typeformWebhook",
            enabled: true,
          }),
        }
      )
        .then((res) => res.json())
        .then((json) => console.log(json));
      break;
    case "social":
      // create activity
      break;
    default:
      // error
      break;
  }
  // 2. social media
  // --> accept social media content/intent link
};

// Update activity data based on webhook
exports.updateActivity = async (req, res) => {};

exports.deleteActivity = async (req, res) => {};

exports.typeformWebhook = async (req, res) => {
  // check if webhook is valid
  // update activity data
  // send response
};
