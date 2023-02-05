"use strict";

var mongoose = require("mongoose");
const Company = require("../models/company");
const Activity = require("../models/activity");
const Loyalty = require("../models/loyalty");

// retrieve single Company's profile with matching id
exports.getOne = async (req, res) => {
  try {
    // console.log(req);
    const Company = await Company.findOne({ _id: req.params.id });
    res.status(200);
    return res.json(Company);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

exports.add = async (req, res) => {
  // VALIDATION
  const Company = new Company(req.body);
  try {
    await Company.save();
    res.status(201);
    return res.json(Company);
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
    const Company = await Company.updateOne({ _id: req.params.id }, req.body);
    res.status(200);
    return res.json(Company);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};

exports.remove = async (req, res) => {
  try {
    await Company.deleteOne({ _id: req.params.id });
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
    const Companys = await Company.find();
    res.status(200);
    return res.json(Companys);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};
