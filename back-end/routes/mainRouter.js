const mainRouter = require("express").Router();
const userModel = require("../models/userModel");
const Meal = require("../models/mealModel");
const Img = require("../models/imgModel");
const multer = require("multer");
const mongoose = require("mongoose");
const uploadMulter = require("../controller/multer");

//upload pic
mainRouter.post(
  "/picUpload/:id",
  uploadMulter.single("photo"),
  async (req, res, next) => {
    try {
      const userID = "609ef2b7d02da1867f40dae8";
      const img = new Img({
        user: userID,
        path: req.file.filename,
      });
      await img.save();
      await userModel.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(userID) },
        { $push: { img: img.id } }
      );

      return res.json({
        status: "OK",
        file: {
          id: img._id,
          userID: img.user,
          path: img.path,
        },
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

//scanner pic upload
mainRouter.post(
  "/scannedUpload/:id",
  uploadMulter.single("scan-pic"),
  async (req, res, next) => {
    try {
      const userID = "609ef2b7d02da1867f40dae8";
      const img = new Img({
        user: userID,
        path: req.file.filename,
      });
      await img.save();
      await Meal.create({ ScannedImg: img });
      return res.json({
        status: "OK",
        file: {
          id: img._id,
          userID: img.user,
          path: img.path,
        },
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

//
mainRouter.post("/user/signupcheck", async (req, res) => {
  const { email, name, password } = req.body;
  // console.log(req.body, "1111");
  try {
    //if (email && name && password) все ломает
    const currentUser = await userModel.findOne({ email });
    // console.log(currentUser, "222");
    if (currentUser) {
      return res.status(516).send("The email is already used");
    } else {
      const user = await userModel.create({ name, email, password });
      // console.log(user, "333333");
      return res.status(200).json(user._id);
    }
    // } return status(516).send("Could not sign up! Please insert form fields");
  } catch (error) {
    return res.status(500).send(error);
  }
});

mainRouter.post("/user/signincheck", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body, "4444");
  try {
    //if (email && name && password) все ломает
    const currentUser = await userModel.findOne({ email });
    // console.log(currentUser, "555");
    if (currentUser) {
      if (currentUser.password === password) {
        return res.status(200).json(currentUser._id);
      }
      return res.status(516).send("Incorrect password");
    } else {
      return res.status(516).send("This email is not registered");
    }
    // } return status(516).send("Could not sign up! Please insert form fields");
  } catch (error) {
    return res.status(500).send(error);
  }
});

mainRouter.post("/user/googleauth", async (req, res) => {
  const { email, name } = req.body;
  try {
    //if (email && name && password) все ломает
    const currentUser = await userModel.findOne({ email });
    // console.log(currentUser, "555");
    if (currentUser) {
      console.log(currentUser);
      return res.status(200).json(currentUser._id);
    } else {
      const user = await userModel.create({ name, email });
      console.log(user);
      return res.status(200).json(user._id);
    }
    // } return status(516).send("Could not sign up! Please insert form fields");
  } catch (error) {
    return res.status(500).send(error);
  }
});

//upload edit data
mainRouter.patch("/profileData/:id", async (req, res) => {
  const user = await userModel.findByIdAndUpdate(
    //req.params.id ,
    "609ef2b7d02da1867f40dae8",
    {
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
    },
    { new: true }
  );
  return res.json(user);
});

module.exports = mainRouter;
