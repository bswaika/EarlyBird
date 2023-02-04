"use strict";
const router = require("express").Router();
const spot = require("./controllers/user");

// trip-user Routes
router.route("/api").get((req, res) => {
  console.log("hello world");
  res.status(200).json({ message: "Hello world!" });
});

module.exports = router;
