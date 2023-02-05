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

router.route("/api/user/:id").get((req, res) => {
  controllers.user.getOne(req, res);
});

// computer Routes
router.route("/api/company/:id").get((req, res) => {
  controllers.company.getOne(req, res);
});

router.route("/api/company").get((req, res) => {
  controllers.company.getAll(req, res);
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

// Special Item Routes

// create new special item
router.route("/api/specialItem/").post((req, res) => {
  controllers.specialItem.generateSpecialItem(req, res);
});

// user purchases special item with reward points
router.route("/api/specialItem/:id/user/:userId").post((req, res) => {
  controllers.specialItem.generateSpecialItem(req, res);
});

// get list of special items
router.route("/api/specialItem/").get((req, res) => {
  controllers.specialItem.getAll(req, res);
});

// get list of special items by company
router.route("/api/specialItem/company/:companyId").get((req, res) => {
  controllers.specialItem.getAllByCompany(req, res);
});

// get list of personally-owned special items
router.route("/api/specialItem/user/:userId").get((req, res) => {
  controllers.specialItem.getUsersSpecialItems(req, res);
});

module.exports = router;
