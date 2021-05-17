const mainRouter = require("express").Router();
const userModel = require("../models/userModel");

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
  // console.log(req.body, "4444");
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

mainRouter.patch("/profileData/:id", async (req, res) => {
  try {
    const personalDetails = await userModel.findByIdAndUpdate(
      "609ef2b7d02da1867f40dae8",
      /*req.params.id*/ {
        info: { ...req.body },
      }
    );
    console.log(personalDetails);
    return res.json(personalDetails);
  } catch (error) {
    res.send(error);
  }
});

mainRouter.patch("/macroData/:id", async (req, res) => {
  console.log(req.body);
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
  console.log(req.body);
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
