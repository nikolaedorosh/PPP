const homepageRouter = require("express").Router();
const { homepageRender } = require("../controller/homepageController");

//render homepage
homepageRouter.route("/").get(homepageRender);

module.exports = homepageRouter;
