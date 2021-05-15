const mainRouter = require("express").Router();
const userModel = require("../models/userModel");

// mainRouter.route("/profileData").patch(personalData);

//
mainRouter.post("/user/:email", async (req, res) => {
  const { email, name } = req.body;
  try {
    if (email && name) {
      const currentUser = await userModel.findOne({ email });
      if (currentUser) {
        console.log(currentUser);
        return res.json(currentUser);
      } else {
        const user = await userModel.create({ name, email });
        return res.json(user);
      }
    } else if (!email) {
      return status(516).send(
        "Could not sign in!! Please insert correct email and password"
      );
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

mainRouter.patch("/profileData/:email", async (req, res) => {
  const { age, gender, weight, height, activity, bmi } = req.body;
  try {
    const personalDetails = await userModel.findByIdAndUpdate(
      req.params.email,
      {
        info: { ...req.body },
      }
    );
    return res.json(personalDetails);
  } catch (error) {
    res.send(error);
  }
});

mainRouter.patch("/macroData/:email", async (req, res) => {
  console.log(req.body);
  const { Proteins, carbohydrates, fats, kcal, targetWeigth } = req.body;
  const macros = await userModel.findByIdAndUpdate(req.params.email, {
    target: { ...req.body },
  });
  return res.sendStatus(200);
});

module.exports = mainRouter;
