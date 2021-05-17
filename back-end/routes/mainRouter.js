const mainRouter = require("express").Router();
const userModel = require("../models/userModel");
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

mainRouter.post("/api/v1/findPic/:id", async (req, res) => {
  const user = await userModel.findById(
    //req.params.id ,
    { _id: "609ef2b7d02da1867f40dae8" }
  );
  res.json(user.img);
});

module.exports = mainRouter;
