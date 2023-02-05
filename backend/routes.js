"use strict";
const router = require("express").Router();
// const user = require("./controllers/spotController");
const middlewares = {
  auth: require("./middlewares/auth"),
};
const controllers = {
  user: require("./controllers/user"),
  activity: require("./controllers/activity"),
  company: require("./controllers/company"),
};

// Routes
router.route("/api").get((req, res) => {
  console.log("hello world");
  res.status(200).json({ message: "Hello world!" });
});

router.post("/api/signup", middlewares.auth.signup, controllers.user.add);
router.post("/api/login", middlewares.auth.login, controllers.user.getOne);

router.post(
  "/api/signupCompany",
  middlewares.auth.signupCompany,
  controllers.company.add
);
router.post(
  "/api/loginCompany",
  middlewares.auth.loginCompany,
  controllers.company.getOne
);

// user Routes
router.route("/api/user/activityUpdate").post((req, res) => {
  controllers.user.activityUpdate(req, res);
});

// company Routes
router.route("/api/createActivity").post((req, res) => {
  controllers.company.createActivity(req, res);
});

router.route("/api/deleteActivity").post((req, res) => {
  controllers.company.deleteActivity(req, res);
});

router.route("/api/typeformWebhook/:activityId").post((req, res) => {
  controllers.user.typeformWebhook(req, res);
});

module.exports = router;
