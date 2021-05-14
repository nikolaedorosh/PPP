const router = require("express").Router()
const userModel = require('../models/userModel')

router.get("/", async (req, res) => {
  const allUsers = await userModel.find();
  console.log(allUsers)
  return res.json(allUsers);
});


module.exports = router;
