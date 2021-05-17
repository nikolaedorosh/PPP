const mainRouter = require("express").Router();
const userModel = require("../models/userModel");

//
// mainRouter.post("/user/:email", async (req, res) => {
//   const { email, name } = req.body;
//   try {
//     if (email && name) {
//       const currentUser = await userModel.findOne({ email });
//       if (currentUser) {
//         return res.json(currentUser);
//       } else {
//         const user = await userModel.create({ name, email });
//         return res.json(user);
//       }
//     } else if (!email) {
//       return status(516).send(
//         "Could not sign in!! Please insert correct email and password"
//       );
//     }
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// });

mainRouter.patch("/profileData/:id", async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, {
      _id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      info: {
        age: req.body.age,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
        activity: req.body.activity,
        bmi: req.body.bmi,
        Proteins: req.body.Proteins,
        carbohydrates: req.body.carbohydrates,
        fats: req.body.fats,
        kcal: req.body.kcal,
        targetWeight: req.body.targetWeight,
      },
    });
    return await res.json(user);
  } catch (error) {
    res.send(error);
  }
});

mainRouter.patch("/macroData/:id", async (req, res) => {
  try {
    const { Proteins, carbohydrates, fats, kcal, targetWeigth } = req.body;
    const macros = await userModel.findByIdAndUpdate(req.params.id, {
      target: { ...req.body },
    });
    return res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

mainRouter.post("/profileImg/:id", async (req, res) => {
  console.log(req.params.id, );
  try {
    const macros = await userModel.findByIdAndUpdate(req.params.id, {
      profileImg: { ...req.body },
    });
    return res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

module.exports = mainRouter;
