"use strict";
const router = require("express").Router();
const spot = require("./controllers/spotController");
const middlewares = {
  auth: require("./middlewares/auth")
}

// trip-user Routes
router.route("/api").get((req, res) => {
  console.log("hello world");
  res.status(200).json({ message: "Hello world!" });
});

router.post('/api/signup', middlewares.auth.signup, )

module.exports = router;
