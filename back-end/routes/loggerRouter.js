const router = require("express").Router()
const userModel = require('../models/userModel')

router.get("/", async (req, res) => {
  const allUsers = await userModel.find();
  // console.log(allUsers)
  return res.json(allUsers);
});


router.post('/createMeal', (req, res) => {
  try {
    const {meal} = req.body;
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(400)
  }
})


module.exports = router;
