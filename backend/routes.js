"use strict";
const router = require("express").Router();
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

// computer Routes
router.route("/api/company/:id").get((req, res) => {
  controllers.company.getOne(req, res);
});

// activity Routes

router.route("/api/company/:companyId/activity").post((req, res) => {
  controllers.activity.createActivity(req, res);
});

router
  .route("/api/company/:companyId/activity/:activityId")
  .delete((req, res) => {
    controllers.activity.deleteActivity(req, res);
  });

router.route("/api/activity/:activityId").get((req, res) => {
  controllers.activity.getOne(req, res);
});

router.route("/api/typeformWebhook/:activityId").post((req, res) => {
  controllers.user.typeformWebhook(req, res);
});

module.exports = router;
