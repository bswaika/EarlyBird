"use strict";

var mongoose = require("mongoose");
const User = require("../models/user");

// retrieve single user's profile with matching id
exports.get_profile = async function (req, res) {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};

exports.create_profile = function (req, res) {
  var new_user = new User(req.body);

  new_user.save(function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json("User profile created");
    }
  });
};

exports.delete_profile = function (req, res) {
  User.deleteOne(
    {
      username: req.params.userId,
    },
    function (err, user) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "User successfully deleted" });
      }
    }
  );
};

exports.list_users = async function (req, res) {
  User.find({}, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};
