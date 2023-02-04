"use strict";

var mongoose = require("mongoose");
const User = require("../models/userModel");

// retrieve single user's profile with matching id
exports.getOne = async (req, res) => {
  try{
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
  console.log(req.body);
  const user = new User(req.body);
  try{
    await user.save();
    res.status(201)
    return res.json(user);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500)
    return res.send(e);
  }
};

exports.update = async (req, res) => {
  try{
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
}

exports.remove = async (req, res) => {
  try{
    await User.deleteOne({ _id: req.params.id });
    res.status(200);
    return res.json({status: 'success'});
  }catch (e) {
    // LOG 
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
  

};

exports.getAll = async function (req, res) {
  try{
    const users = await User.find();
    res.status(200)
    return res.json(users);
  } catch(e) {
    // LOG 
    // CUSTOM ERROR OBJECT
    res.status(500);
    return res.send(e);
  }
};
