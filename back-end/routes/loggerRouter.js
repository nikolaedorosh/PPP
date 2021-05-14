const router = require("express").Router()
const userModel = require('../models/userModel')
const mealModel = require('../models/mealModel')

router.get("/", async (req, res) => {
  const allUsers = await userModel.find();
  return res.json(allUsers);
});


router.post('/createMeal', async (req, res) => {
  let totalCal = 0;
  let totalProt = 0;
  let totalCarb = 0;
  let totalFat = 0;

  try {
  const mealNames = req.body.map(el => {
    totalCal += el.info.cal
    totalProt += el.info.prot
    totalFat += el.info.fat
    totalCarb += el.info.carb
    return el.name
  })
  const myMeal = await mealModel.create({
    date: Date.now(),
    itemNames: mealNames,
    info: {
      totalKcal: totalCal,
      totalProteins: totalProt,
      totalCarbohydrates:  totalCarb,
      totalFats: totalFat,
    },
  })
    res.json(myMeal)
  } catch (e) {
    res.sendStatus(400)
  }
})


module.exports = router;
