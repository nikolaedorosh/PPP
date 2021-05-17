const router = require("express").Router();
const userModel = require("../models/userModel");
const mealModel = require("../models/mealModel");
const nutritionix = require("nutritionix-api");

router.post("/", async (req, res) => {
  // const {id} = req.params
  // const user = await userModel.findOne();
  // const meals = mealModel.find({ id: user.id })
  const meals = await mealModel.find({}, {user: 0})
  return res.json(meals);
});

router.post("/getInfo", async (req, res) => {
  const { text } = req.body;
  nutritionix.init("da8c820a", "60e4e90848f242488cec22ff8af25e03");

  nutritionix.natural.search(text).then((result) => {
    res.json(result.foods);
  });
});

router.post("/createMeal", async (req, res) => {
  try {
    const {items, user} = req.body;
    const myMeal = await mealModel.create({
      user: user,
      date: Date.now(),
      items,
    });
    res.json(myMeal);
  } catch (e) {
    res.sendStatus(400);
  }
});

router.post("/deleteMeal", async (req, res) => {
  try {
    const { date } = req.body;
    await mealModel.findOneAndDelete(date);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
});

module.exports = router;
