"use strict";
const router = require("express").Router();
const spot = require("./controllers/spotController");

// trip-user Routes
router.route("/api").get((req, res) => {
  console.log("hello world");
});

module.exports = router;
