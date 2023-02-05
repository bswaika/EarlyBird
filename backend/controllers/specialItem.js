"use strict";

var mongoose = require("mongoose");
const SpecialItem = require("../models/specialItem").SpecialItemSchema;
const User = require("../models/user");
const ShortUniqueId = require("short-unique-id");
const Loyalty = require("../models/loyalty").LoyaltySchema;

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

// ngl this is a mess and i'm not gna fix it rn
exports.assignOwnership = async (req, res) => {
  try {
    // console.log(req);
    const specialItem = await SpecialItem.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: req.params.userId });

    let existingLoyalty = user.loyalties.filter(
      (x) => x.company == specialItem.company
    );
    let existingSpecialItem = existingLoyalty.specials.filter(
      (x) => x.item == specialItem
    );
    let newLoyalties = user.loyalties
      .filter((x) => x.company != specialItem.company)
      .push(
        new Loyalty({
          username: user.username,
          company: specialItem.company,
          points:
            existingLoyalty.points -
            specialItem.exchangeRate * req.body.quantity,
          specials: existingLoyalty.specials
            .filter((x) => x.item._id == existingSpecialItem._id)
            .push({
              item: specialItem,
              quantity: existingSpecialItem.quantity + req.body.quantity,
            }),
        })
      );

    // Update user doc
    user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        loyalties: newLoyalties,
        $dec: { rewardPoints: specialItem.exchangeRate * req.body.quantity },
      },
      { new: true },
      function (err, user) {}
    );

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
