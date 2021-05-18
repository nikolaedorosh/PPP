const { Schema, model } = require("mongoose");

const mealSchema = new Schema({
  user: {
    id: String,
    name: String,
    email: String,
    // type: Schema.Types.ObjectId,
    // ref: "userModel"
  },
  date: Number,
  items: [
    {
      name: String,
      num: Number,
      image: String,
      ScannedImg: { type: Schema.Types.ObjectId, ref: "Img", default: null },
      info: {
        cal: Number,
        fat: Number,
        carb: Number,
        prot: Number,
      },
    },
  ],
});

const mealModel = model("Meal", mealSchema);

module.exports = mealModel;
