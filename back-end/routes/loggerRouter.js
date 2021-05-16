const router = require("express").Router()
const userModel = require('../models/userModel')
const mealModel = require('../models/mealModel')


router.get("/", async (req, res) => {
  const allUsers = await userModel.find();
  return res.json(allUsers);
});

router.get('/' , async (req,res) =>{
  const allMeals = await userModel.find().populate('Meal');
  console.log(allMeals)
})


router.post('/createMeal', (req, res) => {
  try {
    const {meal} = req.body;
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(400)
  }
})


module.exports = router;
