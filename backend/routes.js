"use strict";
const router = require("express").Router();
const middlewares = {
  auth: require("./middlewares/auth")
}
// const spot = require("./controllers/spotController");

// trip-user Routes
router.route("/api").get((req, res) => {
  console.log("hello world");
});

router.post('/api/signup', middlewares.auth.signup, )

module.exports = router;
