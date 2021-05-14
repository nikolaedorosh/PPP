const mainRouter = require("express").Router();
const { personalData } = require("../controller/controller");

mainRouter.route("/profileData").patch(personalData);

module.exports = mainRouter;
