const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Company = require("../models/company");
const secret = process.env.JWT_SECRET;

exports.signup = async (req, res, next) => {
  const { name, email, passwordHash } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400);
    return res.json({
      message: "Email already exists!",
    });
  }
  const hash = await bcrypt.hash(passwordHash, bcrypt.genSaltSync());
  req.body.token = jwt.sign({ email }, secret, {
    expiresIn: "7d",
  });
  req.body.passwordHash = hash;
  next();
};

exports.login = async (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    try {
      const { email } = jwt.verify(token, secret);
      if (!email) {
        res.status(401);
        return res.json({
          message: "invalid token!",
        });
      }
      const { _id } = await User.findOne({ email: email });
      req.params.id = _id;
      next();
    } catch (e) {
      return res.send(e);
    }
  } else {
    try {
      const { email, passwordHash } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(401);
        return res.json({
          message: "invalid token!",
        });
      }
      const result = await bcrypt.compare(passwordHash, user.passwordHash);
      if (result) {
        user.token = jwt.sign({ email }, secret, {
          expiresIn: "7d",
        });
        await user.save();
        req.params.id = user._id;
        next();
      }
    } catch (e) {
      console.log(e);
      res.status(500);
      return res.send(e);
    }
  }
};

exports.signupCompany = async (req, res, next) => {
  const { name, email, passwordHash } = req.body;
  const company = await Company.findOne({ email: email });
  if (company) {
    res.status(400);
    return res.json({
      message: "Email already exists!",
    });
  }
  const hash = await bcrypt.hash(passwordHash, bcrypt.genSaltSync());
  req.body.token = jwt.sign({ email }, secret, {
    expiresIn: "7d",
  });
  req.body.passwordHash = hash;
  next();
};

exports.loginCompany = async (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    try {
      const { email } = jwt.verify(token, secret);
      if (!email) {
        res.status(401);
        return res.json({
          message: "invalid token!",
        });
      }
      const { _id } = await Company.findOne({ email: email });
      req.params.id = _id;
      next();
    } catch (e) {
      return res.send(e);
    }
  } else {
    try {
      const { email, passwordHash } = req.body;
      const company = await Company.findOne({ email: email });
      if (!company) {
        res.status(401);
        return res.json({
          message: "invalid token!",
        });
      }
      const result = await bcrypt.compare(passwordHash, company.passwordHash);
      if (result) {
        company.token = jwt.sign({ email }, secret, {
          expiresIn: "7d",
        });
        await company.save();
        req.params.id = company._id;
        next();
      }
    } catch (e) {
      console.log(e);
      res.status(500);
      return res.send(e);
    }
  }
};
