"use strict";

var mongoose = require("mongoose");
const SpecialItem = require("../models/specialItem").SpecialItem;
const User = require("../models/user");

// retrieve single user's profile with matching id
exports.getOne = async (req, res) => {
  try {
    // console.log(req);
    const specialItem = await SpecialItem.findOne({ _id: req.params.id });
    res.status(200);
    return res.json(specialItem);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

exports.getAll = async function (req, res) {
  try {
    const specialItems = await SpecialItem.find();
    res.status(200);
    return res.json(specialItems);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

exports.getAllByCompany = async function (req, res) {
  try {
    const specialItems = await SpecialItem.find({
      company: req.params.companyId,
    });
    res.status(200);
    return res.json(specialItems);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
  }
};

// get list of personally-owned special items
exports.getUsersSpecialItems = async (req, res) => {
  try {
    // console.log(req);
    const userDoc = await User.findOne({ _id: req.params.id });
    res.status(200);
    return res.json(userDoc.specialItems);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
  }
};

// lets a company create a specialty item
exports.generateSpecialItem = async (req, res) => {
  // VALIDATION
  const specialItem = new SpecialItem(req.body);
  try {
    await specialItem.save();
    res.status(201);
    return res.json(specialItem);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

exports.assignOwnership = async (req, res) => {
  try {
    // console.log(req);
    const specialItem = await SpecialItem.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: req.params.userId });
    user.rewardPoints -= specialItem.exchangeRate * req.body.quantity;
    user.specialItems.push({ item: specialItem, quantity: req.body.quantity });
    await user.save();

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
    await SpecialItem.deleteOne({ _id: req.params.id });
    res.status(200);
    return res.json({ status: "success" });
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};
